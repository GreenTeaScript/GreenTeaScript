
print "module GreenScript {";

while ($line = <>)  {
	
	if($line =~ /^import/ || $line =~ /^package/) {
		next;
	}
	$line =~ s/extends KonohaStatic//g;
	$line =~ s/KonohaStatic\.//g;
	$line =~ s/implements(.*)\{/{/g;
	$line =~ s/([A-Z]\w+)\/\*constructor\*\//constructor/g;

	$line =~ s/int([ \t])/number$1/g;
	$line =~ s/long([ \t])/number$1/g;
	$line =~ s/final //;
	$line =~ s/public //;
	$line =~ s/private //;
	$line =~ s/static[ \t]+(.*\(.*)\{/function $1 {/g;
	$line =~ s/static //;
	$line =~ s/ \([\w+]\)/ \<$1\>/g;
	$line =~ s/\@Override//;
	$line =~ s/\@HostLang//;
		
	$line =~ s/boolean[ \t]+(.*\(.*)\{/$1:boolean {/g;
	$line =~ s/String[ \t]+(.*\(.*)\{/$1:string {/g;
	$line =~ s/number[ \t]+(.*\(.*)\{/$1:number {/g;
        $line =~ s/void[ \t]+(.*\(.*)\{/$1:void {/g;
	$line =~ s/([A-Z]\w+)[ \t]+(.*\(.*)\{/$2:$1 {/g;

	$line =~ s/boolean[ \t]+(\w+)[ \t]+=/var $1 :boolean =/g;
	$line =~ s/String[ \t]+(\w+)[ \t]+=/var $1 :string =/g;
	$line =~ s/number[ \t]+(\w+)[ \t]+=/var $1 :number =/g;
	$line =~ s/([A-Z]\w+)[ \t]+(\w+)[ \t]+=/var $2 :$1 =/g;

	$line =~ s/boolean[ \t]+(\w+)(\W)/$1 :boolean$2/g;
	$line =~ s/number[ \t]+(\w+)(\W)/$1 :number$2/g;
	$line =~ s/String[ \t]+(\w+)(\W)/$1 :string$2/g;
	$line =~ s/([A-Z]\w+)[ \t]+(\w+)(\W)/$2 :$1$3/g;
	
	$line =~ s/:TokenList/:KonohaToken[]/g;
	$line =~ s/: TokenList/:KonohaToken[]/g;
	$line =~ s/: number/:number/g;
	$line =~ s/: string/:string/g;
	$line =~ s/(\S)([ \t]+)(\S)/$1 $3/g;
	print "\t" . $line;
}

print "}";

