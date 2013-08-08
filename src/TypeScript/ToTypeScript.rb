
$Keyword = /return|new|throw|class|interface|extends|impliments|public|private|protected|static|final|function|instanceof|else|var/
$Sym  = /(?!#{$Keyword})\b(?!\d)\w+\b/
$Type = /#{$Sym}(?:<.*?>)?(?:\[\s*\d*\s*\])*/o
$Attr = /\b(?:public|private|protected|static|final)\b\s*/

src = STDIN.read()

src.gsub!("};", "}")

src.gsub!(/interface GtConst {(.*?)^}/m){
	# Constants. public final static int N = 0; => var N: int = 0;
	$1.gsub(/(?:#{$Attr})* (#{$Type})\s+(#{$Sym})(\[\s*\d*\s*\])*/o){"var #{$2}: #{$1}#{$3}"}
	.gsub(/(?:#{$Attr})*/o, "")
}
src.gsub!(/class GtStatic(.*?)^}/m){
	# Constants. public final static int N = 0; => var N: int = 0;
	$1.gsub(/(?:#{$Attr})*/, "")
	.gsub(/(#{$Attr})*(#{$Type})\s+(#{$Sym})\s*\((.*?)\)/o){"function #{$1}#{$3}(/*params*/#{$4}): #{$2}"}
}

# Comments
src.gsub!(/\/\/[#\s]*ifdef\s+JAVA.*?VAJA/m, "")
src.gsub!(/\/\/(.*?)$/m) { "// #{$1} //" }
# Fields. public static int n = 0; => public static n: int = 0;
src.gsub!(/\/\*field\*\/(#{$Attr})*(#{$Type})\s+(#{$Sym})/o){"#{$1}#{$3}: #{$2}"}
# Local variables.  int n = 0; => var n: int = 0;
src.gsub!(/\/\*local\*\/(#{$Type})\s+(#{$Sym})/o){"var #{$2}: #{$1}"}
src.gsub!(/(#{$Type})\s+(#{$Sym})\s+=/o){"var #{$2}: #{$1} ="}
# Methods. public int f(float n){...} => public f(/*params*/float n): int{...}
src.gsub!(/(#{$Attr})*(#{$Type})\s+(#{$Sym})\s*\((.*?)\)/o){"#{$1}#{$3}(/*params*/#{$4}): #{$2}"}
# Constractors.
src.gsub!(/(#{$Attr})*(#{$Sym})\/\*constructor\*\/\((.*?)\)/o){"#{$1}constructor(/*params*/#{$3})"}
src.gsub!(/new\s+(#{$Type})\[(.+)\]/o){"new Array<#{$1}>(#{$2})"}
# Method's parameters. 
src.gsub!(/\(\/\*params\*\/(.*?)\)/o){ "(" + $1.gsub(/(#{$Type})\s+(#{$Sym})/o){"#{$2}: #{$1}"} + ")"}
# Constants. public final static int N = 0; => var N: int = 0;
src.gsub!(/(?:#{$Attr})* (#{$Type})\s+(#{$Sym})(\[\s*\d*\s*\])*/o){"#{$2}: #{$1}#{$3}"}
# Array literals.
src.gsub!(/\/\*BeginArray\*\/{/, "[")
src.gsub!(/\/\*EndArray\*\/}/, "]")
src.gsub!(/=\s*{(.*?)}/){ "= [#{$1}]" }
# Fields.
src.gsub!(/(#{$Attr})*(#{$Type})\s+(#{$Sym})/o){"#{$1}#{$3}: #{$2}"}

# Types
src.gsub!(/\b(?:char|int|long|float|double|Charactor|Integer|Long|Float|Double)\b/, "number")
src.gsub!(/\.(?:int|long|float|double|)Value\(\)/, "")
src.gsub!(/\bString\b/, "string")
src.gsub!(/\bArrayList<\?>/, "any")
src.gsub!(/\bArrayList\b/, "Array")
src.gsub!(/\bnew\s+Array<.*?>\s*\(Arrays.asList\((.*?)\)\)/){ $1 }
src.gsub!(/\bArrays.asList\b/, "")
#src.gsub!(/\bGtMap\b/, "Object")

src.gsub!(/'(.)'/){ "(#{$1.bytes[0]}/*#{$1}*/)" }
src.gsub!(/('..')/){ "(#{$1}.charCodeAt(0))" }

src.gsub!(/\bfinal\b/, "")
src.gsub!(/\bprotected\b/, "")
src.gsub!(/@Override\s*/, "")
src.gsub!(/@Deprecated\s*/, "")
src.gsub!(/\bextends GtStatic\s*/, "")
src.gsub!(/\bGtStatic\./, "")
src.gsub!(/\binstanceof\s+string\b/, "instanceof String")
src.gsub!(/\binstanceof\s+number\b/, "instanceof Number")

# Casts
src.gsub!(/\((string|number)\)/o){"<#{$1}>"}
src.gsub!(/\(\/\*cast\*\/(#{$Type})\)/o){"<#{$1}>"}

src.gsub!(/\bpublic class\b/, "class")

#src.gsub!(/\bsize\(\)/, "length")
src.gsub!(/\blength\(\)/, "length")
src.gsub!(/\bSystem\.out\.println/, "console.log")

# Delegates.
src.gsub!(/FunctionA\(this, "(.+?)"\)/){ "KonohaGrammar.#{$1}" }
src.gsub!(/FunctionB\(this, "(.+?)"\)/){ "KonohaGrammar.#{$1}" }
src.gsub!(/FunctionC\(this, "(.+?)"\)/){ "KonohaGrammar.#{$1}" }
src.gsub!(/(?!\.)\b((?:Parse|Type)(?:Unary|Binary|Const|Block))\b(?!\()/){ "KonohaGrammar.#{$1}" }
src.gsub!(/\bGtDelegate(?:Common|Token|Match|Type)\b/){ "any" }
src.gsub!(/KonohaGrammar\.KonohaGrammar\./){ "KonohaGrammar." }

src.gsub!(/(LangDeps\.)?DebugP\(/, 'console.log("DEBUG: " + ')
src.gsub!(/LangDeps\.println\(/, 'console.log(')
src.gsub!(/function console.log\("DEBUG: " \+ /, 'function DebugP(')

puts '/// <reference path="LangDeps.ts" />'
puts src
