ruby ToTypeScript.rb < ../GreenTeaScript.java > GreenTeaScript.ts
ruby ToTypeScript.rb < ../GreenTeaGenerator.java > GreenTeaGenerator.ts
ruby ToTypeScript.rb < ../JavaScriptSourceGenerator.java > JavaScriptSourceGenerator.ts
ruby ToTypeScript.rb < ../GreenTeaScriptTester.java > GreenTeaScriptTester.ts

tsc GreenTeaScript.ts GreenTeaGenerator.ts JavaScriptSourceGenerator.ts GreenTeaScriptTester.ts
