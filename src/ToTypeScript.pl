
$LineComment = "#";
$Indent = "";
$ClassIndent = "";

$JavaOnly = 0;
$TopLevel = 1;
$UsePython = 1;
$UseTypeScript = 0;

if($UseTypeScript == 1) {
	$ClassIndent = "\t";
	$LineComment = "//";
	print "module GreenScript {\n";
	$TopLevel = 0;
}

sub PythonSelf {
	my($line) = @_;
	if($UsePython == 0) {
		return $line;
	}
	if($line =~ /static/) {
		return $line;
	}
	$line =~ s/public(.*)\(\)(.*)$/def$1(self) $2/;
        $line =~ s/private(.*)\(\)(.*)$/def$1(self) $2/;
	$line =~ s/public(.*)\((.*)$/def$1(self, $2/;
	$line =~ s/private(.*)\((.*)$/def$1(self, $2/;
	$line =~ s/\/\//\# /g;
	$line =~ s/\/\*field\*\/(.*)/\# $1/g;
	return $line;
}

sub PythonSyntax {
	my($line) = @_;
	if($UsePython == 0) {
		return $line;
	}
        $line =~ s/this/self/g;
	$line =~ s/([ \t]:\w+)//g;
        $line =~ s/ \{/:/g;
        $line =~ s/\}/#/g;
	$line =~ s/;$//g;
	$line =~ s/function /def /g;
	$line =~ s/var //g;
	$line =~ s/constructor\(/def __init__(self, /g;
	$line =~ s/new //g;
        $line =~ s/(\w)\[\]/$1/g;
	$line =~ s/([ \(\,])true/$1True/g;
	$line =~ s/([ \(\,])false/$1False/g;
	$line =~ s/null/None/g;
	$line =~ s/toString/__str__/g;
	$line =~ s/ \|\|/ or/g;
	$line =~ s/ \&\&/ and/g;
	return $line;
}

while ($line = <>)  {
	if($line =~ /JAVA/) {
		$JavaOnly = 1;
	}	
	if($line =~ /VAJA/) {
		$JavaOnly = 0;
		next;
	}
	if($JavaOnly == 1) {
		# print $LineComment . $line;
		next;
	}
	if($line =~/class/ ) {
		$Indent = $ClassIndent;
		$TopLevel = 0;
	}
	if($line =~/^\/\//) {
		next;
	}
	if($TopLevel == 1) {
		$line = substr($line, 1);
	}
	$line =~ s/extends GtStatic//g;
	$line =~ s/GtStatic\.//g;
	$line =~ s/implements(.*)\{/{/g;
	$line =~ s/extends/<:/g;

	$line = PythonSelf($line);

	$line =~ s/([A-Z]\w+)\/\*constructor\*\//constructor/g;

	$line =~ s/(?:int|long|char)([ \t])/number$1/g;
	#$line =~ s/int([ \t])/number$1/g;
	#$line =~ s/long([ \t])/number$1/g;
	#$line =~ s/char([ \t])/number$1/g;
	$line =~ s/final //;
	$line =~ s/public //;
	$line =~ s/private //;
	$line =~ s/static[ \t]+(.*\(.*)\{/function $1 {/g;
	$line =~ s/static //;
	$line =~ s/ \([\w+]\)/ \<$1\>/g;
	$line =~ s/\@Override //;
	
	## set return type for methods and functions
	$line =~ s/boolean[ \t]+(.*\(.*)\{/$1:boolean {/g;
	$line =~ s/String[ \t]+(.*\(.*)\{/$1:string {/g;
	$line =~ s/number[ \t]+(.*\(.*)\{/$1:number {/g;
        $line =~ s/void[ \t]+(.*\(.*)\{/$1:void {/g;
	$line =~ s/([A-Z]\w+)[ \t]+([A-Z]\w+\(.*)\{/$2:$1 {/g;

	$line =~ s/boolean[ \t]+(\w+)[ \t]+=/var $1 :boolean =/g;
	$line =~ s/String[ \t]+(\w+)[ \t]+=/var $1 :string =/g;
	$line =~ s/number[ \t]+(\w+)[ \t]+=/var $1 :number =/g;
	$line =~ s/([A-Z]\w+)[ \t]+(\w+)[ \t]+=/var $2 :$1 =/g;

	$line =~ s/boolean[ \t]+(\w+)(\W)/$1 :boolean$2/g;
	$line =~ s/number[ \t]+(\w+)(\W)/$1 :number$2/g;
	$line =~ s/String[ \t]+(\w+)(\W)/$1 :string$2/g;
	$line =~ s/([A-Z]\w+)[ \t]+(\w+)(\W)/$2 :$1$3/g;
	
	$line =~ s/new GtArray\(\)/[]/g;
	$line =~ s/new GtMap\(\)/{}/g;
        $line =~ s/GtArray/any[]/g;
        $line =~ s/GtMap/object/g;
	$line =~ s/\.get\(([\w\.]+)\)/[$1]/g;
	$line =~ s/\.set\((\w+), (\w+)\)/[$1] = $2/g;
	$line =~ s/\.add\((\w+)\)/.push($1)/g;
	$line =~ s/\/\*BeginArray\*\/{/[/g;
	$line =~ s/\/\*EndArray\*\/}/]/g;
	$line =~ s/Function(?:A|B|C)\(this, \"(\w+)\"\)/$1/g;
	if($UseTypeScript == 1) {
		$line =~ s/GtFuncA/(a :TokenContext, b :string, c :number) => number/g;
		$line =~ s/GtFuncB/(a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree/g;
		$line =~ s/GtFuncC/(a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNode/g;
		$line =~ s/\<\:/extends/g;	
	}

	## remove redundandat white spaces
	$line =~ s/(\S)([ \t]+)(\S)/$1 $3/g;
	$line =~ s/\/\*.*\*\///g;

	# python
	$line = PythonSyntax($line);
	print $Indent . $line;
}

if($UseTypeScript == 1) {
	print "}\n";
}


