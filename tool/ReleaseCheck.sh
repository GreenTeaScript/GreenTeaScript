#!/bin/bash

GREENTEA='java -jar GreenTeaScript.jar'
BASEDIR="test/exec"
if [ -d $1 ]
then
	BASEDIR=$1
endif

OUTDIR="$BASEDIR/test-result"
OUTFILE="$OUTDIR/TestResult.csv"

INCLUDEDIR="include"
CFLAGS="-I$INCLUDEDIR/c/ -g -Wall"

JAVA=`which java`
CC=`which gcc`
NODE=`which node`
PY=`which python`
BASH=`which bash3`

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


TestEach() { #$1: command $2 file $3 stage 
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
	if [ $1 = $PY ]
        then
                if [ $3 -eq 1 ]
                then
                        $GREENTEA -o $2.py $2
                        ReportFile "$2.py"
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

}

MakeHead() {
	TestEach $PY ".py" 0
	TestEach $CC ".c"  0
	TestEach $PY `basename $PY` 0
	TestEach $CC `basename $CC` 0
}

TestTimeEach() {
	START_TIME=`date +%s`
	TestEach $1 $2 $3	
	END_TIME=`date +%s`
	SS=`expr ${END_TIME} - ${START_TIME}`
}

TestAll() {
	TestEach $PY $1 1
	TestEach $CC $1 1
	TestEach $PY $1 2
	TestEach $CC $1 2
}

TestBash() {
if [ -x $BASH ]
then
	export GREENTEA_HOME=$BASEDIR/../../
	$GREENTEA -o $OUTDIR/$1.sh $BASEDIR/$1
	if [ -f "$OUTDIR/$1.sh" ]
	then
		bash $OUTDIR/$1.sh
		return $?
	fi
fi
return 1
}

## test script

Prepare() {
	mkdir -p $OUTDIR
	if [ -f $OUTFILE ]
	then
		rm -rf $OUTDIR/*
	fi
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
cat $OUTFILE

