ruby ToTypeScript.rb < ../GreenTeaScript.java > GreenTeaScript.ts
ruby ToTypeScript.rb < ../SourceGenerator.java > SourceGenerator.ts
ruby ToTypeScript.rb < ../JavaScriptSourceGenerator.java > JavaScriptSourceGenerator.ts
ruby ToTypeScript.rb < ../GreenTeaScriptTest.java > GreenTeaScriptTest.ts
ruby ToTypeScript.rb < ../PerlSourceGenerator.java > PerlSourceGenerator.ts
ruby ToTypeScript.rb < ../JavaSourceGenerator.java > JavaSourceGenerator.ts
ruby ToTypeScript.rb < ../CSourceGenerator.java > CSourceGenerator.ts

tsc GreenTeaScript.ts SourceGenerator.ts JavaScriptSourceGenerator.ts PerlSourceGenerator.ts JavaSourceGenerator.ts CSourceGenerator.ts GreenTeaScriptTest.ts
