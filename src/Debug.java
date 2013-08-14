//import java.util.ArrayList;
//
//
//public class Debug extends GtStatic {
//	public final static void main(String[] Args) {
//		int N = 0;
//		Args = new String[2];
//		Args[N++] = "--c";
//		Args[N++] = "test/0023-ConstDecl.green";

//	}
//	public static final int	CallExpressionOffset = 0;
//	public static final int	CallParameterOffset	 = 1;
//
//	public static GtNode TypeCheckMethodCall(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType TypeInfo) {
//		GtNode MemberExpr = ParsedTree.TypeNodeAt(CallExpressionOffset, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
//		if(MemberExpr.IsError()) {
//			return MemberExpr;
//		}
//		GtNode Reciver = null;
//		String MethodName = null;
//		if(MemberExpr instanceof ConstNode) {
//			ConstNode Const = (ConstNode) MemberExpr;
//			if(Const.ConstValue instanceof GtMethod) {
//				// E.g., $MethodName($Param[0], $Param[1]) => MemberExpr = (ConstNode:Method)
//				GtMethod Method = (GtMethod) Const.ConstValue;
//				MethodName = Method.MethodName;
//			}
//			else {
//				// E.g., $ClassName.$MethodName($Param[0], $Param[1]) => MemberExpr = (ConstNode:Func)
//				// transform to $MethodName.Invoke($Param[0], $Param[1])
//				return Gamma.CreateErrorNode(ParsedTree, "Calling Function Object is not supported yet.");
//			}
//		}
//		else if(MemberExpr instanceof LocalNode) {
//			// E.g., $FieldName($Param[0], $Param[1]) => MemberExpr = (LocalNode:Func FieldName)
//			LocalNode LNode = (LocalNode) MemberExpr;
//			MethodName = LNode.LocalName;
//		}
//		else if(MemberExpr instanceof GetterNode) {
//			// E.g., $Symbol . $MethodName($Param[0]) 
//			//         => MemberExpr = (GetterNode:Method SomeInstance FieldName)
//			//       $Symbol . $FieldName($Param[0]) 
//			//         => MemberExpr = (GetterNode:Func   SomeInstance FieldName)
//			GetterNode GNode = (GetterNode) MemberExpr;
//			Reciver = GNode.Expr;
//			GtMethod Method = (GtMethod) GNode.Method;
//			MethodName = Method.MethodName;
//		}
//		return this.TypeFindingMethod(Gamma, ParsedTree, TypeInfo, Reciver, MethodName);
//	}
//
//	private GtNode TypeFindingMethod(GtTypeEnv Gamma, GtSyntaxTree ParsedTree, GtType Type, GtNode Reciver,
//			String MethodName) {
//		ArrayList<GtSyntaxTree> NodeList = ParsedTree.TreeList;
//		int ParamSize = NodeList.size() - CallParameterOffset;
//		GtType ReciverType = Reciver.Type;
//		GtMethod Method = ReciverType.LookupMethod(MethodName, ParamSize);
//
//		GtToken KeyToken = ParsedTree.KeyToken;
//		if(Method != null) {
//			ApplyNode CallNode = new ApplyNode(Method.GetReturnType(), KeyToken, Method);
//			CallNode.Append(Reciver);
//			return this.TypeMethodEachParam(Gamma, CallNode, NodeList, ParamSize);
//		}
//		return Gamma.CreateErrorNode(ParsedTree, "undefined method: " + MethodName + " in " + ReciverType.ShortClassName);
//	}
//
//	private GtNode TypeMethodEachParam(GtTypeEnv Gamma, ApplyNode CallNode, ArrayList<GtSyntaxTree> NodeList, int ParamSize) {
//		GtMethod Method = CallNode.Method;
//		for(int ParamIdx = 0; ParamIdx < ParamSize; ParamIdx++) {
//			GtType ParamType = Method.GetParamType(ParamIdx);
//			GtSyntaxTree UntypedParamNode = (GtSyntaxTree) NodeList.get(CallParameterOffset + ParamIdx);
//			GtNode ParamNode;
//			if(UntypedParamNode != null) {
//				ParamNode = GtTypeEnv.TypeCheck(Gamma, UntypedParamNode, ParamType, DefaultTypeCheckPolicy);
//			}else {
//				ParamNode = Gamma.GetDefaultGtNode(ParamType);
//			}
//			if(ParamNode.IsError()) {
//				return ParamNode;
//			}
//			CallNode.Append(ParamNode);
//		}
//		return CallNode;
//	}
//}