use strict;
use warnings;

my $Keyword = "return|new|throw|class|interface|extends|impliments|public|private|protected|static|final|function|instanceof|else|var"
my $Sym  = "(?!$Keyword\b)\b(?!\d)\w+\b"
my $Type = "$Sym(?:<.*?>)?(?:\[\s*\d*\s*\])*"
my $Attr = "\b(?:public|private|protected|static|final)\b\s*"

my $content = join '', <STDIN>;

$src =~ s/};/}/g

sub GtConstSection{
	$_[0] =~ s/(?:$Attr)* ($Type)\s+($Sym)(\[\s*\d*\s*\])*/var $2: $1$3/g
	$_[0] =~ s/(?:$Attr)*//g
	return $_[0]
}

sub GtStaticSection{
	$_[0] =~ s/(?:$Attr)*//g
	$_[0] =~ s/($Attr)*($Type)\s+($Sym)\s*\((.*?)\)/function $1$3(\/*params*\/$4): $2/g
	return $_[0]
}

$src =~ s/interface GtConst {(.*?)^}/&GtConstSection($1)/e

$src =~ s/class GtStatic(.*?)^}/&GtStaticSection($1)/e

# Comments
$src =~ s/\/\/[#\s]*ifdef\s+JAVA.*?VAJA//gm
$src =~ s/\/\/(.*?)$/\/\/ $1 \/\//gm
# Fields. public static int n = 0; => public static n: int = 0;
$src =~ s/\/\*field\*\/($Attr)*($Type)\s+($Sym)/$1$3: $2/gm
# Local variables.  int n = 0; => var n: int = 0;
$src =~ s/\/\*local\*\/($Type)\s+($Sym)/var $2: $1/g
$src =~ s/($Type)\s+($Sym)\s+=/var $2: $1 =/g
# Methods. public int f(float n){...} => public f(/*params*/float n): int{...}
$src =~ s/($Attr)*($Type)\s+($Sym)\s*\((.*?)\)/$1$3(\/*params*\/$4): $2/g
# Constractors.
$src =~ s/($Attr)*($Sym)\/\*constructor\*\/\((.*?)\)/$1 constructor(\/*params*\/$3)/g
$src =~ s/new\s+($Type)\[(.+)\]/new Array<$1>($2)/g
# Method's parameters. 
$src =~ s/\(\/\*params\*\/(.*?)\)/"(" + $1 =~ s\/($Type)\s+($Sym)\/$2: $1\/g + ")"/eg
# Constants. public final static int N = 0; => var N: int = 0;
$src =~ s/(?:$Attr)* ($Type)\s+($Sym)(\[\s*\d*\s*\])*/$2: $1$3/g
# Array literals.
$src =~ s/\/\*BeginArray\*\/{/\[/g
$src =~ s/\/\*EndArray\*\/}/\]/g
$src =~ s/=\s*{(.*?)}/= \[$1\]/g
# Fields.
$src =~ s/($Attr)*($Type)\s+($Sym)/$1$3: $2/g

# Types
$src =~ s/(?!")\b(?:char|int|long|float|double|Charactor|Integer|Long|Float|Double)\b(?!")/number/g
$src =~ s/\.(?:int|long|float|double|)Value\(\)//g
$src =~ s/\bString\b/string/g
$src =~ s/\bArrayList<\?>/any/g
$src =~ s/\bArrayList\b/Array/g
$src =~ s/\bnew\s+Array<.*?>\s*\(Arrays.asList\((.*?)\)\)/$1/g
$src =~ s/\bArrays.asList\b//g
$src =~ s/\b(\d+)L\b/$1/g

$src =~ s/'(.)'/$1.ord\/*$1*\//g
$src =~ s/('..')/($1.charCodeAt(0))/g

$src =~ s/\bfinal\b//g
$src =~ s/\bprotected\b//g
$src =~ s/@Override\s*//g
$src =~ s/@Deprecated\s*//g
$src =~ s/\bextends GtStatic\s*//g
$src =~ s/\bGtStatic\.//g
$src =~ s/\binstanceof\s+string\b/instanceof String/g
$src =~ s/\binstanceof\s+number\b/instanceof Number/g

$src =~ s/number.class/Number/g
$src =~ s/string.class/String/g
$src =~ s/Boolean.class/Boolean/g
$src =~ s/Object.class/Object/g
$src =~ s/Void.class/null/g

# Casts
$src =~ s/\((string|number)\)/<$1>/g
$src =~ s/\(\/\*cast\*\/($Type)\)/<$1>/g

$src =~ s/\bpublic class\b/class/g

#$src =~ s/\bsize\(\)/length/g
$src =~ s/\blength\(\)/length/g
$src =~ s/\bSystem\.out\.println/console.log/g

# Delegates.
$src =~ s/FunctionA\(this, "(.+?)"\)/DScriptGrammar.$1/g
$src =~ s/FunctionB\(this, "(.+?)"\)/DScriptGrammar.$1/g
$src =~ s/FunctionC\(this, "(.+?)"\)/DScriptGrammar.$1/g
$src =~ s/(?!\.)\b((?:Parse|Type)(?:Unary|Binary|Const|Block))\b(?!\(\))/DScriptGrammar.$1/g
$src =~ s/\bGtDelegate(?:Common|Token|Match|Type)\b/any/g
$src =~ s/DScriptGrammar\.DScriptGrammar\./DScriptGrammar./g

$src =~ s/(LangDeps\.)?DebugP\(/console.log("DEBUG: " + /g
$src =~ s/LangDeps\.println\(/console.log(/g
$src =~ s/function console.log\("DEBUG: " \+ /function DebugP(/g

# For string literal
$src =~ s/name: undefined/undefined name/g
$src =~ s/tree: untyped/untyped tree/g
$src =~ s/undefinedchecker: type/undefined type checker/g

print $src
