#!/usr/bin/env perl
use Getopt::Long;

my $Indent = "";
my $JavaOnly = 0;

my $DefaultTarget = "ts";
my $UsePython = 0;
my $UseTypeScript = 1;

sub Config {
	if($UseTypeScript == 1) {
		$ClassIndent = "\t";
		$LineComment = "//";
		print "module GreenScript {\n";
		$TopLevel = 0;
	}

	if ($UsePython == 1) {
		$ClassIndent = "";
		$LineComment = "#";
		$TopLevel = 1;
	}
}

sub ConvertToIR {
	my($line) = @_;
	$line =~ s/extends GtStatic//g;
	$line =~ s/GtStatic\.//g;
	$line =~ s/implements(.*)\{/{/g;
	$line =~ s/extends/<<:/g;
	$line =~ s/instanceof/<:?/g;
	$line =~ s/\/\*local\*\//local /g;
	#$line =~ s/public final static[ \t]+(\w+)[ \t]*\=/const $1 =/g;
	return $line;
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
	$line =~ s/ \<\<\: (\w+)/ ($1)/g;
	$line =~ s/(\w+) \<\:\?/type($1) ==/g;
	$line =~ s/local //g;
	$line =~ s/\/\*extension\*\//pass/g;
	return $line;
}

sub Convert {
	my %opts = ();
	GetOptions(\%opts,
		'target=s'
	);

	if($opts{target} eq "ts") {
		$UsePython = 0;
		$UseTypeScript = 1;
	}
	if ($opts{target} eq "py") {
		$UsePython = 1;
		$UseTypeScript = 0;
	}

	&Config;
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

		$line = ConvertToIR($line);
		$line = PythonSelf($line);

		$line =~ s/([A-Z]\w+)\/\*constructor\*\//constructor/g;
		$line =~ s/\(\/\*cast\*\/(\w+)\)/<$1>/g;
		$line =~ s/(?:int|long|char|Integer)([ \t])/number$1/g;
		$line =~ s/(?:final|public|private|\@Override|\@Depricated) //g;
		$line =~ s/static[ \t]+(.*\(.*)\{/function $1 {/g;
		$line =~ s/static /const /;
		$line =~ s/ \((\w+)\)/ <$1>/g;
		$line =~ s/new ArrayList\<\w+\>\(\)/[]/g;
		$line =~ s/ArrayList\<\?\>/ArrayList<any>/g;
		$line =~ s/ArrayList\<(\w+)\>/$1\[\]/g;

		## set return type for methods and functions
		$line =~ s/(boolean|String|number|void)[ \t]+(.*\(.*)\{/$2:$1 {/g;
		$line =~ s/([A-Z]\w+)[ \t]+([A-Z]\w+\(.*)\{/$2:$1 {/g;
		$line =~ s/([A-Z]\w+\[\])[ \t]+([A-Z]\w+\(.*)\{/$2:$1 {/g;
		$line =~ s/ArrayList\<(\w+)\>[ \t]+([A-Z]\w+\(.*)\{/$2:$1\[\] {/g;

		$line =~ s/(boolean|String|number)[ \t]+(\w+)[ \t]+=/var $2 :$1 =/g;
		$line =~ s/([A-Z]\w+)[ \t]+(\w+)[ \t]+=/var $2 :$1 =/g;
		$line =~ s/([A-Z]\w+\[\])[ \t]+(\w+)[ \t]+=/var $2 :$1 =/g;
		$line =~ s/ArrayList\<(\w+)\>[\ t]+(\w+)[ \t]+=/var $2 :$1\[\] =/g;

		#(T N) => (N :T)
		$line =~ s/(boolean|number|String)[ \t]+(\w+)(\W)/$2 :$1$3/g;
		$line =~ s/([A-Z]\w+)[ \t]+(\w+)(\W)/$2 :$1$3/g;
		$line =~ s/([A-Z]\w+\[\])[ \t]+(\w+)(\W)/$2 :$1$3/g;
		$line =~ s/ArrayList\<(\w+)\>[ \t]+(\w+)(\W)/$2 :$1\[\]$3/g;

		$line =~ s/new GtMap\(\)/{}/g;

		$line =~ s/\.get\(([\w\.]+)\)/[$1]/g;
		$line =~ s/\.set\((\w+), (\w+)\)/[$1] = $2/g;
		$line =~ s/\/\*BeginArray\*\/{/[/g;
		$line =~ s/\/\*EndArray\*\/}/]/g;
		$line =~ s/Function(?:A|B|C)\(this, \"(\w+)\"\)/$1/g;

		if($UseTypeScript == 1) {
			$line =~ s/\.add\((\w+)\)/.push($1)/g;
			$line =~ s/GtDelegateToken/(a :TokenContext, b :string, c :number) => number/g;
			$line =~ s/GtDelegateMatch/(a :SyntaxPattern, b :SyntaxTree, c :TokenContext) => SyntaxTree/g;
			$line =~ s/GtDelegateType/(a :TypeEnv, b: SyntaxTree, c: GtType) => TypedNode/g;
			$line =~ s/GtMap/any/g;
			$line =~ s/\:String/:string/g;
			$line =~ s/\<\<\:/extends/g;
			$line =~ s/\<\:\?/instanceof/g;
			$line =~ s/(local|const) //g;
		}
		# python
		$line = PythonSyntax($line);

		## remove redundandat white spaces
		$line =~ s/(\S)([ \t]+)(\S)/$1 $3/g;
		$line =~ s/\/\*.*\*\///g;
		print $Indent . $line;
	}

	if($UseTypeScript == 1) {
		print "}\n";
	}
}

&Convert;
