use File::Find;


my $ArrayName = "GreenTeaLibraries";

print "var GreenTeaLibraries: { [key: string]: string; } = {};\n";

sub process{
	my $name = $_;
	my $path = $File::Find::name;
	unless (-f $_) {
		#print "// $name is not file\n";
		return;
	}
	open(IN, "<", $name) or die("$path : error :$!");
	my @lines = <IN>;
	close(IN);
	my $text = join("\n", @lines);
	$text =~ s/\\/\\\\/g;
	$text =~ s/\n/\\n/g;
	$text =~ s/\v/\\v/g;
	$text =~ s/\f/\\f/g;
	$text =~ s/\r/\\r/g;
	$text =~ s/"/\\"/g;
	print "GreenTeaLibraries[\"$path\"] = \"$text\";\n";
}

find(\&process, @ARGV[0]);
