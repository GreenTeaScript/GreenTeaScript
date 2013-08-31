use strict;
use warnings;

my $Keyword = "(?:ifdef|endif|return|new|throw|class|interface|extends|impliments|public|private|protected|static|final|function|instanceof|else|var)";
my $Sym  = "(?:(?!$Keyword\\b)\\b(?!\\d)\\w+\\b)";
my $Type = "(?:$Sym(?:<.*?>)?(?:\\[\\s*\\d*\\s*\\])*)";
my $Attr = "(?:\\b(?:public|private|protected|static|final)\\b\\s*)";

my $Grammar = "GreenTeaGrammar";

my $src = join '', <STDIN>;

my @StringLiterals;
my @Comments;

sub ProtectString{
	my $n = @StringLiterals;
	my $text = $_[0];
	$StringLiterals[$n] = $text;
	return "#STR$n#"
}

sub ProtectComment{
	my $n = @Comments;
	my $text = $_[0];
	$Comments[$n] = $text;
	return "#COMMENT$n#"
}

# Delegates.
$src =~ s/Function(?:A|B|C)\(this, "(.+?)"\)/$Grammar\["$1"\]/g;

# Pritect String literal
$src =~ s/(".*?")/&ProtectString($1)/ge;

$src =~ s/};/}/g;

sub GtConstSection{
	my $text = $_[0];
	$text =~ s/(?:$Attr*)($Type)\s+($Sym)((?:\[\s*\d*\s*\])?)/var $2: $1$3/g;
	$text =~ s/$Attr//g;
	return $text;
}

sub GtStaticSection{
	my $text = $_[0];
	$text =~ s/$Attr*//g;
	$text =~ s/($Attr*)($Type)\s+($Sym)\s*\((.*?)\)/function $1$3(#params#$4): $2/g;
	return $text;
}

sub Params{
	my $text = $_[0];
	$text =~ s/($Type)\s+($Sym)/$2: $1/g;
	return $text;
}

$src =~ s/interface GtConst {(.*?)^}/GtConstSection($1)/ems;
$src =~ s/class GtStatic(.*?)^}/GtStaticSection($1)/ems;

# Comments
$src =~ s/^\/\/[#\s]*ifdef\s+JAVA.*?VAJA//gms;
$src =~ s/(\/\/.*?)$/&ProtectComment($1)/gems;
# Fields. public static int n = 0; => public static n: int = 0;
$src =~ s/\/\*field\*\/($Attr*)($Type)\s+($Sym)/$1$3: $2/gm;
# Local variables.  int n = 0; => var n: int = 0;
$src =~ s/\/\*local\*\/($Type)\s+($Sym)/var $2: $1/g;
# Constractors.
$src =~ s/($Attr*)($Sym)\/\*constructor\*\/\((.*?)\)/$1 constructor(#params#$3)/g;
$src =~ s/new\s+($Type)\[(.+)\]/new Array<$1>($2)/g;
# Casts
#$src =~ s/\((string|number)\)/<$1>/g;
$src =~ s/\(\/\*cast\*\/($Type)\)/<$1>/g;
# Array literals.
$src =~ s/\/\*BeginArray\*\/{/\[/g;
$src =~ s/\/\*EndArray\*\/}/\]/g;
# Protect Comments
$src =~ s/(\/\*.*?\*\/)/&ProtectComment($1)/gmse;

# Methods. public int f(float n){...} => public f(#params#float n): int{...}
$src =~ s/($Attr*)($Type)\s+($Sym)\s*\((.*?)\)/$1$3(#params#$4): $2/g;
# Method's parameters.
$src =~ s/\(#params#(.*?)\)/"(" . Params($1) . ")"/eg;
# Constants. public final static int N = 0; => var N: int = 0;
$src =~ s/(?:$Attr*) ($Type)\s+($Sym)((?:\[\s*\d*\s*\])?)/$2: $1$3/g;
# Array literals.
$src =~ s/=\s*{(.*?)}/= \[$1\]/g;
# Unrestricted Local Variables
#$src =~ s/($Type)\s+($Sym)\s+=/var $2: $1 =/g;
# Unrestricted Fields.
#$src =~ s/($Attr*)($Type)\s+($Sym)/$1$3: $2/g;

# Types
$src =~ s/(?!")\b(?:char|int|long|float|double|Charactor|Integer|Long|Float|Double)\b(?!")/number/g;
$src =~ s/\.(?:int|long|float|double|)Value\(\)//g;
$src =~ s/(?!")\bString\b/string/g;
$src =~ s/\bArrayList<\?>/any/g;
$src =~ s/\bArrayList\b/Array/g;
$src =~ s/\bnew\s+Array<.*?>\s*\(Arrays.asList\((.*?)\)\)/$1/g;
$src =~ s/\bArrays.asList\b//g;
$src =~ s/\.toArray\(\)//g;
$src =~ s/\b(\d+)L\b/$1/g;

$src =~ s/'(\\.)'/ord($1) . '\/*' . $1 . '*\/'/eg;
$src =~ s/'(.)'/ord($1) . '\/*' . $1 . '*\/'/eg;
$src =~ s/('..')/($1.charCodeAt(0))/g;

$src =~ s/\bfinal\b//g;
$src =~ s/\bprotected\b//g;
$src =~ s/\@Override\s*//g;
$src =~ s/\@Deprecated\s*//g;
$src =~ s/\bextends GtStatic\s*//g;
$src =~ s/\bGtStatic\.//g;
$src =~ s/\binstanceof\s+string\b/instanceof String/g;
$src =~ s/\binstanceof\s+number\b/instanceof Number/g;
$src =~ s/\b([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*) instanceof String/(typeof $1 == 'string' || $1 instanceof String)/g;

$src =~ s/number.class/Number/g;
$src =~ s/string.class/String/g;
$src =~ s/Boolean.class/Boolean/g;
$src =~ s/Object.class/Object/g;
$src =~ s/Void.class/null/g;

$src =~ s/\bpublic class\b/class/g;

#$src =~ s/\bsize\(\)/length/g
$src =~ s/\blength\(\)/length/g;
$src =~ s/\bSystem\.out\.println/console.log/g;

# Delegates.
$src =~ s/(?!\.)\b((?:Parse|Type)(?:Unary|Binary|Const|Block))\b(?!\()/$Grammar\["$1"\]/g;
$src =~ s/\bGtDelegate(?:Common|Token|Match|Type)\b/any/g;
$src =~ s/$Grammar\.$Grammar/$Grammar/g;

# For debug
#$src =~ s/(LibGreenTea\.)?DebugP\(/console.log("DEBUG: " + /g;
#$src =~ s/LibGreenTea\.println\(/console.log(/g;
#src =~ s/function console.log\("DEBUG: " \+ /function DebugP(/g;

my $n = @Comments;
my $i = 0;
while($i < $n){
	$src =~ s/#COMMENT$i#/$Comments[$i]/;
	$i = $i + 1;
}

$n = @StringLiterals;
$i = 0;
while($i < $n){
	$src =~ s/#STR$i#/$StringLiterals[$i]/;
	$i = $i + 1;
}

print $src;
