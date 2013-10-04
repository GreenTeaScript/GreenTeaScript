use strict;
use warnings;

my $src = join '', <STDIN>;

$src =~ s/([^\.])(\r\n|\n|\r)/$1/gm;
$src =~ s/.*\(\d+,\d+\): error //g;
my @lines = split(/(\r\n|\n|\r)/, $src);

my %tmp;
my @sort = grep(  !$tmp{$_}++, @lines );

print join("\n" , @sort) . "\n";