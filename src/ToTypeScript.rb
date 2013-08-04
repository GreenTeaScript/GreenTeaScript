
JavaOnlySecion = false

$Keyword = /return|new|throw|class|interface|extends|impliments|public|private|protected|static|final|function|instanceof|else/
$Type = /(?!#{$Keyword})\b(?!\d)\w+\b(?:<.*?>)?(?:\[\s*\d*\s*\])*/o
$Attr = /\b(?:public|private|protected|static|final)\b\s*/
$Sym  = /(?!#{$Keyword})\b(?!\d)\w+\b/

src = STDIN.read()

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

src.gsub!(/\/\/[#\s]*ifdef\s+JAVA.*?VAJA/m, "")

src.gsub!(/\/\/(.*?)$/m) { "// #{$1} //" }

# Local variables.  int n = 0; => var n: int = 0;
src.gsub!(/\/\*local\*\/(#{$Type})\s+(#{$Sym})/o){"var #{$2}: #{$1}"}
# Fields. public static int n = 0; => public static n: int = 0;
src.gsub!(/\/\*field\*\/(#{$Attr})*(#{$Type})\s+(#{$Sym})/o){"#{$1}#{$3}: #{$2}"}
# Methods. public int f(float n){...} => public f(/*params*/float n): int{...}
src.gsub!(/(#{$Attr})*(#{$Type})\s+(#{$Sym})\s*\((.*?)\)/o){"#{$1}#{$3}(/*params*/#{$4}): #{$2}"}
# Constractors.
src.gsub!(/(#{$Attr})*(#{$Sym})\/\*constructor\*\/\((.*?)\)/o){"#{$1}constructor(/*params*/#{$3})"}
# Method's parameters. 
src.gsub!(/\(\/\*params\*\/(.*?)\)/o){ "(" + $1.gsub(/(#{$Type})\s+(#{$Sym})/o){"#{$2}: #{$1}"} + ")"}
# Constants. public final static int N = 0; => var N: int = 0;
src.gsub!(/(?:#{$Attr})* (#{$Type})\s+(#{$Sym})(\[\s*\d*\s*\])*/o){"#{$2}: #{$1}#{$3}"}

src.gsub!(/\/\*BeginArray\*\/{/, "[");
src.gsub!(/\/\*EndArray\*\/}/, "]");

# Types
src.gsub!(/\b(?:int|long|float|double|Integer|Long|Float|Double)\b/, "number");
src.gsub!(/\bString\b/, "string");
src.gsub!(/\bObject\b/, "object");
src.gsub!(/\bArrayList<\?>/, "any");
src.gsub!(/\bArrayList\b/, "Array");
src.gsub!(/\bGtMap\b/, "Object");

src.gsub!(/\bfinal\s*/, "");
src.gsub!(/@Override\s*/, "");
src.gsub!(/\bextends GtStatic\s*/, "");
src.gsub!(/\bGtStatic\./, "");

# Casts
src.gsub!(/\((string|number)\)/o){"<#{$1}>"}
src.gsub!(/\(\/\*cast\*\/(#{$Type})\)/o){"<#{$1}>"}

src.gsub!(/\bpublic class\b/, "class");
puts src
