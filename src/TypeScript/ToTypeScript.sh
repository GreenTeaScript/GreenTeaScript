ruby ToTypeScript.rb < ../GreenTeaScript.java > GreenTeaScript.ts
ruby ToTypeScript.rb < ../SourceGenerator.java > SourceGenerator.ts
ruby ToTypeScript.rb < ../JavaScriptSourceGenerator.java > JavaScriptSourceGenerator.ts
ruby ToTypeScript.rb < ../GreenTeaScriptTester.java > GreenTeaScriptTester.ts

tsc GreenTeaScript.ts SourceGenerator.ts JavaScriptSourceGenerator.ts GreenTeaScriptTester.ts
