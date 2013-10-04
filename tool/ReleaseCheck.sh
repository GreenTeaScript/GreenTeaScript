#!/bin/bash

if [ -z $GREENTEA ]
then
	GREENTEA='java -ea -jar GreenTeaScript.jar'
fi

BASEDIR="test/common"
#if [ -z $1 -a -d $1 ]
#then
#	#BASEDIR=$1
#fi

OUTDIR="$BASEDIR/test-result"
OUTFILE="$OUTDIR/TestResult.csv"

INCLUDEDIR="include"
CFLAGS="-I$INCLUDEDIR/c/ -g -Wall"

JAVA=`which java`
CC=`which gcc`
NODE=`which node`
PYTHON=`which python`
BASH=`which bash`
PERL=`which perl`
RUBY=`which ruby`
TS=`which tsc`

VERBOSE=""
Verbose() {
	VERBOSE="$VERBOSE$1 "
}

VerboseLine() {
	echo -n $VERBOSE
	echo " $1"
	VERBOSE=""
}

Report() {
	if [ $1 -eq 0 ]
	then
		echo -n ", OK" >> $OUTFILE
	else
		echo -n ", FAILED($1)" >> $OUTFILE
	fi
}

ReportFile() {
	if [ -f $1 ]
	then
		echo -n ", Yes" >> $OUTFILE
	else
		echo -n ", No" >> $OUTFILE
	fi
}

ReportRuntime() {
	if [ -x $JAVA ]
	then
		echo "Java: $JAVA"
		echo "============"
		$JAVA -version
		echo
	else
		JAVA="#java"
	fi
	if [ -x $PYTHON ]
	then
		echo "Python: $PYTHON"
		echo "=========="
		$PYTHON --version
		echo
	else
		PYTHON="#python"
	fi
	if [ -x $PERL ]
	then
		echo "Perl: $PERL"
		echo "=========="
		$PERL --version
		echo
	else
		PERL="#perl"
	fi
	if [ -x $BASH ]
	then
		echo "Shell: $BASH"
		echo "=========="
		$BASH --version
		echo
	else
		BASH="#bash"
	fi
	if [ -x $RUBY ]
	then
		echo "Ruby: $RUBY"
		echo "=========="
		$RUBY --version
		echo
	else
		RUBY="#ruby"
	fi
	if [ -x $NODE ]
	then
		echo "Node: $NODE"
		echo "=========="
		$NODE -v
		echo
	else
		NODE="#node"
	fi
	if [ -x $TS ]
	then
		echo "TypeScript: $TS"
		echo "=========="
		$TS -v
		echo
	else
		TS="#tsc"
	fi
	if [ -x $CC ]
	then
		echo "C Compiler: $CC"
		echo "=========="
		$CC -v
		echo
	else
		CC="#gcc"
	fi

}

TestEach() { #$1: command $2 file $3 stage
	if [ $3 -eq 0 ]
	then
		echo -n ", $2" >> $OUTFILE
		return 0
	fi
	if [ $1 = $CC ]
	then
		if [ $3 -eq 1 ]
		then
			$GREENTEA -o $2.c $2
			$CC $CFLAGS -o $2.exe $2.c
			ReportFile "$2.exe"
		elif [ $3 -eq 2 ]
		then
			if [ -x $1 -a -x "$2.exe" ]
			then
				Verbose `basename $2.exe`
				./$2.exe
				Report $?
			else
				echo -n ", N/A" >> $OUTFILE
			fi
		else
			echo -n ", $2" >> $OUTFILE
		fi
		return 0
	fi
	if [ $1 = $PYTHON ]
	then
		if [ $3 -eq 1 ]
		then
			$GREENTEA -o $2.py $2
			if [ -x $1 ]
			then
				$1 -m py_compile $2.py
				ReportFile $2.pyc
			else
				ReportFile $2.py
			fi
		elif [ $3 -eq 2 ]
		then
			if [ -x $1 -a -f "$2.py" ]
			then
				Verbose `basename $2.py`
				$1 $2.py
				Report $?
			else
				echo -n ", N/A" >> $OUTFILE
			fi
		else
			echo -n ", $2" >> $OUTFILE
		fi
		return 0
	fi
	if [ $1 = $PERL ]
	then
		if [ $3 -eq 1 ]
		then
			$GREENTEA -o $2.pl $2
			if [ -x $1 -a -f "$2.pl" ]
			then
				#perl -cw
				$1 -cw $2.pl
				if [ $? -ne 0 ]
				then
					echo -n ", No" >> $OUTFILE
					return 0
				fi
			fi
			ReportFile "$2.pl"
		elif [ $3 -eq 2 ]
		then
			if [ -x $1 -a -f "$2.pl" ]
			then
				Verbose `basename $2.pl`
				$1 $2.pl
				Report $?
			else
				echo -n ", N/A" >> $OUTFILE
			fi
		else
			echo -n ", $2" >> $OUTFILE
		fi
		return 0
	fi
	if [ $1 = $NODE ]
	then
		if [ $3 -eq 1 ]
		then
			$GREENTEA -o $2.js $2
			ReportFile "$2.js"
		elif [ $3 -eq 2 ]
		then
			if [ -x $1 -a -f "$2.js" ]
			then
				Verbose `basename $2.js`
				$1 $2.js
				Report $?
			else
				echo -n ", N/A" >> $OUTFILE
			fi
		else
			echo -n ", $2" >> $OUTFILE
		fi
		return 0
	fi
	if [ $1 = $BASH ]
	then
		if [ $3 -eq 1 ]
		then
			$GREENTEA -o $2.sh $2
			ReportFile "$2.sh"
		elif [ $3 -eq 2 ]
		then
			if [ -x $1 -a -f "$2.sh" ]
			then
				Verbose `basename $2.sh`
				$1 $2.sh
				Report $?
			else
				echo -n ", N/A" >> $OUTFILE
			fi
		else
			echo -n ", $2" >> $OUTFILE
		fi
		return 0
	fi
	if [ $1 = "VM" ]
	then
		if [ $3 -eq 2 ]
		then
			$GREENTEA $2
			Report $?
		fi
	fi
}

MakeHead() {
	TestEach $PYTHON ".py" 0
	TestEach $NODE ".js" 0
	TestEach $PERL ".pl" 0
	TestEach $BASH ".sh" 0
	TestEach $CC ".c"  0
	TestEach "VM" "green-jvm" 0
	TestEach $PYTHON `basename $PYTHON` 0
	TestEach $NODE `basename $NODE` 0
	TestEach $PERL `basename $PERL` 0
	#TestEach $BASH `basename $BASH` 0
	#TestEach $JAVA `basename $JAVA` 0
	TestEach $CC `basename $CC` 0
}

TestTimeEach() {
	START_TIME=`date +%s`
	TestEach $1 $2 $3
	END_TIME=`date +%s`
	SS=`expr ${END_TIME} - ${START_TIME}`
}

TestAll() {
	# 1 means source code generation
	# ensure that all code generations are finished before execution
	TestEach $PYTHON $1 1
	TestEach $NODE $1 1
	TestEach $PERL $1 1
	TestEach $BASH $1 1
	TestEach $JAVA $1 1
	TestEach $CC $1 1
	# 2 means execution test
	TestEach "VM" $1 2
	TestEach $PYTHON $1 2
	TestEach $NODE $1 2
	TestEach $PERL $1 2
	#TestEach $JAVA $1 2
	TestEach $CC $1 2
}

## test script

Prepare() {
	mkdir -p $OUTDIR
	if [ -f $OUTFILE ]
	then
		rm -rf $OUTDIR/*
	fi
	ReportRuntime >& $OUTDIR/Language.log
	echo -n "Test" >> $OUTFILE
	MakeHead
	echo >> $OUTFILE

}

TFILE=""

Source() {
	for TPATH in $BASEDIR/*.green
	do
		TFILE=`basename $TPATH`
		echo -n ${TFILE%.*} >> $OUTFILE
		Verbose "Testing ${TFILE%.*}"
		TFILE="$OUTDIR/$TFILE"
		cp $TPATH $TFILE
		STIME=`date +%s`
		TestAll $TFILE 1> $TFILE.log1 2> $TFILE.log2
		ETIME=`date +%s`
		SS=`expr ${ETIME} - ${STIME}`
		VerboseLine "(elapsed-time: $SS sec)"
		echo >> $OUTFILE
	done
}

Prepare
Source
echo
cat $OUTFILE

