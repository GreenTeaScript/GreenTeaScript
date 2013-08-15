perl ToTypeScript.pl < ../GreenTeaScript.java > GreenTeaScript.ts
perl ToTypeScript.pl < ../GreenTeaTopObject.java > GreenTeaTopObject.ts
perl ToTypeScript.pl < ../SourceGenerator.java > SourceGenerator.ts
perl ToTypeScript.pl < ../JavaScriptSourceGenerator.java > JavaScriptSourceGenerator.ts
perl ToTypeScript.pl < ../PerlSourceGenerator.java > PerlSourceGenerator.ts
perl ToTypeScript.pl < ../JavaSourceGenerator.java > JavaSourceGenerator.ts
perl ToTypeScript.pl < ../CSourceGenerator.java > CSourceGenerator.ts
perl ToTypeScript.pl < ../BashSourceGenerator.java > BashSourceGenerator.ts
perl ToTypeScript.pl < ../GreenTeaScriptTest.java > GreenTeaScriptTest.ts

tsc LangDeps.ts GreenTeaScript.ts GreenTeaTopObject.ts SourceGenerator.ts JavaScriptSourceGenerator.ts PerlSourceGenerator.ts JavaSourceGenerator.ts CSourceGenerator.ts BashSourceGenerator.ts GreenTeaScriptTest.ts 
