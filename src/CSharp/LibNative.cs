using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

public static class LibNative
{
    public static string GetClassName(object Value)
    {
        return Value.GetType().Name;
    }

   	public static Type GetClassOfValue(object Value) {
		return Value.GetType();
	}

    public static GtType GetNativeType(Type NativeClass) {
		GtType NativeType = null;
		NativeType = (GtType)GtStaticTable.ClassNameMap.GetOrNull(NativeClass.FullName);
		if(NativeType == null) {
			NativeType = new GtType(GreenTeaUtils.NativeType, NativeClass.Name, null, NativeClass);
            GtStaticTable.SetNativeTypeName(NativeClass.FullName, NativeType);
            LibGreenTea.VerboseLog(GreenTeaUtils.VerboseNative, "creating native class: {0}, {1}", NativeClass.Name, NativeClass.FullName);
		}
		return NativeType;
	}

    private static bool AcceptJavaType(GtType GreenType, Type Type)
    {
        if (GreenType.IsVarType() || GreenType.IsTypeVariable())
        {
            return true;
        }
        if (GreenType.IsTopType())
        {
            return (Type == typeof(object));
        }
        GtType JavaType = LibNative.GetNativeType(Type);
        if (GreenType != JavaType)
        {
            if (GreenType.IsGenericType() && GreenType.HasTypeVariable())
            {
                return GreenType.BaseType == JavaType.BaseType;
            }
            return false;
        }
        return true;
    }

    public static bool MatchNativeMethod(GtType[] GreenTypeParams, MethodInfo CLRMethod)
    {
        if (!AcceptJavaType(GreenTypeParams[0], CLRMethod.ReturnType))
        {
            return false;
        }
        int StartIndex = 2;
        if (CLRMethod.IsStatic)
        {
            StartIndex = 1;
        }
        else
        {
            if (GreenTypeParams.Length == 1 || !AcceptJavaType(GreenTypeParams[1], CLRMethod.DeclaringType))
            {
                return false;
            }
            StartIndex = 2;
        }
        int ParamSize = GreenTypeParams.Length - StartIndex;
        Type[] ParamTypes = CLRMethod.GetParameters().Select(p => p.ParameterType).ToArray();
        if (ParamTypes != null)
        {
            if (ParamTypes.Length != ParamSize) return false;
            for (int j = 0; j < ParamTypes.Length; j++)
            {
                if (!AcceptJavaType(GreenTypeParams[StartIndex + j], ParamTypes[j]))
                {
                    return false;
                }
            }
            return true;
        }
        else
        {
            return (ParamSize == 0);
        }
    }

    public static Type ImportClass(String ClassName)
    {
        try
        {
            return Type.GetType("GreenTeaScript." + ClassName);
        }
        catch (Exception)
        {
        }
        return Type.GetType(ClassName);
    }

    public static MethodInfo ImportMethod(GtType ContextType, String FullName, bool StaticMethodOnly)
    {
        /*local*/
        int Index = FullName.LastIndexOf(".");
        if (Index > 0)
        {
            try
            {
                string FuncName = FullName.Substring(Index + 1);
                Type NativeClass = LibNative.ImportClass(FullName.Substring(0, Index));
                bool isFunc = ContextType.IsFuncType();
                var parameters = ContextType.TypeParams;
                var FoundMethods = NativeClass.GetMethods().Where(m => m.IsPublic && (!StaticMethodOnly || m.IsStatic) && (!isFunc || MatchNativeMethod(parameters, m))).ToList();
                if (FoundMethods.Count > 1)
                {
                    LibGreenTea.VerboseLog(GreenTeaUtils.VerboseUndefined, "overloaded method: " + FullName);
                }
                if (FoundMethods.Count == 0)
                {
                    LibGreenTea.VerboseLog(GreenTeaUtils.VerboseUndefined, "undefined method: " + FullName + " for " + ContextType);
                }
                else
                {
                    return FoundMethods.First();
                }
            }
            catch (Exception e)
            {
                LibGreenTea.VerboseLog(GreenTeaUtils.VerboseException, e.ToString());
            }
        }
        return null;
    }
    
	public static object GetNativeFieldValue(object ObjectValue, FieldInfo NativeField) {
        return NativeField.GetValue(ObjectValue);
	}

    public static object ImportStaticObject(GtParserContext Context, Type NativeClass, string Symbol)
    {
        try
        {
            FieldInfo NativeField = NativeClass.GetField(Symbol);
            if (NativeField.IsStatic)
            {
                return GetNativeFieldValue(null, NativeField);
            }
        }
        catch (Exception)
        {
            //NoSuchFieldException
            //LibGreenTea.VerboseException(e);
        }
        GtPolyFunc PolyFunc = new GtPolyFunc(null);
        MethodInfo[] Methods = NativeClass.GetMethods();
        for (int i = 0; i < Methods.Length; i++)
        {
            if (Methods[i].Name.Equals(Symbol) && (Methods[i].Attributes & MethodAttributes.Static) == 0)
            {
                PolyFunc.Append(Context, LibGreenTea.ConvertNativeMethodToFunc(Context, Methods[i]), null);
            }
        }
        if (PolyFunc.FuncList.Count() == 1)
        {
            return PolyFunc.FuncList[0];
        }
        else if (PolyFunc.FuncList.Count() != 0)
        {
            return PolyFunc;
        }
        return null;
    }

    public static object ImportStaticFieldValue(GtParserContext Context, GtType ClassType, String Symbol)
    {
        return ImportStaticObject(Context, (Type)ClassType.TypeBody, Symbol);
    }

    public static object ImportNativeObject(GtNameSpace NameSpace, string PackageName)
    {
        LibGreenTea.VerboseLog(GreenTeaUtils.VerboseNative, "importing " + PackageName);
        try
        {
            Type NativeClass = LibNative.ImportClass(PackageName);
            try
            {
                MethodInfo LoaderMethod = NativeClass.GetMethod("ImportGrammar");//, typeof(GtNameSpace), typeof(Type));
                LoaderMethod.Invoke(null, new object[] { NameSpace, NativeClass });
            }
            catch (Exception)
            {  // naming
            }
            return LibNative.GetNativeType(NativeClass);
        }
        catch (Exception)
        {
        }
        int Index = PackageName.LastIndexOf(".");
        if (Index >= 0)
        {
            try
            {
                Type NativeClass = LibNative.ImportClass(PackageName.Substring(0, Index));
                return ImportStaticObject(NameSpace.Context, NativeClass, PackageName.Substring(Index + 1));
            }
            catch (Exception)
            {
            }
        }
        return null;
    }

    public static void LoadNativeConstructors(GtParserContext Context, GtType ClassType, List<GtFunc> FuncList)
    {
		var NativeClass = (Type)ClassType.TypeBody;
        var GtConstructors = NativeClass.GetConstructors().Where(c => c.IsPublic).Select(c =>
        {
            var TypeList = new List<GtType>() { ClassType };
            TypeList.AddRange(c.GetParameters().Select(p => LibNative.GetNativeType(p.ParameterType)));
            var Func = new GtFunc(GreenTeaConsts.ConstructorFunc, ClassType.ShortName, 0, TypeList);
            Func.SetNativeMethod(0, c);
            Context.RootNameSpace.AppendConstructor(ClassType, Func, null);
            return Func;
        }).ToList();
        FuncList.AddRange(GtConstructors);
        if (GtConstructors.Count == 0)
        {
			Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, GreenTeaUtils.ConstructorSymbol()), null);
		}
    }

    public static GtFunc LoadNativeField(GtParserContext Context, GtType ClassType, String FieldName, Boolean GetSetter)
    {
        //GtParserContext Context = ClassType.Context;
        try
        {
            Type NativeClass = (Type)ClassType.TypeBody;
            FieldInfo NativeField = NativeClass.GetField(FieldName);
            if (NativeField.IsPublic)
            {
                var GtFieldType = GetNativeType(NativeField.GetType());

                var GetterNativeFunc = new GtFunc(GreenTeaConsts.GetterFunc, FieldName, 0, new List<GtType>() { GtFieldType, ClassType });
                GetterNativeFunc.SetNativeMethod(0, NativeField);
                Context.RootNameSpace.SetGetterFunc(ClassType, FieldName, GetterNativeFunc, null);

                var SetterNativeFunc = new GtFunc(GreenTeaConsts.SetterFunc, FieldName, 0, new List<GtType>() { GtStaticTable.VoidType, ClassType, GtFieldType });
                SetterNativeFunc.SetNativeMethod(0, NativeField);
                Context.RootNameSpace.SetSetterFunc(ClassType, FieldName, SetterNativeFunc, null);

                return GetSetter ? SetterNativeFunc : GetterNativeFunc;
            }
        }
        catch (System.Security.SecurityException e)
        {
            LibGreenTea.VerboseException(e);
        }
        catch (MissingFieldException)
        {
        }
        Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, GreenTeaUtils.GetterSymbol(FieldName)), null);
        Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, GreenTeaUtils.SetterSymbol(FieldName)), null); // for setter
        return null;
    }

    public static void LoadNativeMethods(GtParserContext Context, GtType ClassType, String FuncName, List<GtFunc> FuncList)
    {
        Type NativeClass = (Type)ClassType.TypeBody;
        var GtMethods = NativeClass.GetMethods()
            .Where(m => m.IsPublic && LibGreenTea.EqualsString(FuncName, m.Name))
            .Select(m => LibGreenTea.ConvertNativeMethodToFunc(Context, m)).ToList();
        foreach(var method in GtMethods){
            Context.RootNameSpace.AppendMethod(method, null);
            FuncList.Add(method);
        }
        if (GtMethods.Count == 0)
        {
            Context.RootNameSpace.SetUndefinedSymbol(GreenTeaUtils.ClassSymbol(ClassType, FuncName), null);
        }
    }

    public static object ApplyMethod(GtFunc Func, object Self, object[] Params)
    {
        try
        {
            return ((MethodInfo)Func.FuncBody).Invoke(Self, Params);
        }
        catch (TargetInvocationException e)
        {
            LibGreenTea.VerboseException(e);
        }
        catch (ArgumentException e)
        {
            LibGreenTea.VerboseException(e);
        }
        catch (MemberAccessException e)
        {
            LibGreenTea.VerboseException(e);
        }
        return null;
    }

    public static object ApplyMethodV(GtFunc Func, object Self, params object[] Params)
    {
        return ApplyMethod(Func, Self, Params);
    }

    public static long ApplyTokenFunc(GtFunc TokenFunc, object TokenContext, string Text, long pos)
    {
        return (long)ApplyMethodV(TokenFunc, null, TokenContext, Text, pos);
    }

    public static GtSyntaxTree ApplyParseFunc(GtFunc ParseFunc, GtNameSpace NameSpace, GtTokenContext TokenContext, GtSyntaxTree LeftTree, GtSyntaxPattern Pattern)
    {
        return (GtSyntaxTree)ApplyMethodV(ParseFunc, null, NameSpace, TokenContext, LeftTree, Pattern);
    }

    public static GtNode ApplyTypeFunc(GtFunc TypeFunc, GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType ContextType)
    {
        return (GtNode)ApplyMethodV(TypeFunc, null, Gamma, ParsedTree, ContextType);
    }
}
