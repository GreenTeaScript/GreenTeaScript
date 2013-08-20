#!/bin/bash

GREENTEA='java -jar GreenTeaScript.jar'
BASEDIR="test/exec"
OUTDIR="test-result"
INCLUDEDIR="include"
OUTFILE="$OUTDIR/TestResult.csv"
CFLAGS="-I$INCLUDEDIR/c/ -g -Wall"

JAVA=`which java`
CC=`which gcc`
NODE=`which node`
PY=`which python`
BASH=`which bash`

TestJava() {
if [ -x $JAVA ]
then
	$GREENTEA -o $OUTDIR/$1.java $BASEDIR/$1
	if [ -f "$OUTFILE/$1.java" ] 
	then
		return 0
	fi
fi
return 1
}

TestC() {
if [ -x $CC ]
then
	$GREENTEA -o $OUTDIR/$1.c $BASEDIR/$1
	if [ -f "$OUTDIR/$1.c" ]
	then
		$CC $CFLAGS -o $OUTDIR/$1.exe $OUTDIR/$1.c
		if [ -x "$OUTDIR/$1.exe" ]
		then
			$OUTDIR/$1.exe
			return $?
		fi
	fi
fi
return 1
}

TestPython() {
if [ -x $PY ]
then
	$GREENTEA -o $OUTDIR/$1.py $BASEDIR/$1
	if [ -f "$OUTDIR/$1.py" ]
	then
		python $OUTDIR/$1.py
		return $?
	fi
fi
return 1
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

mkdir -p $OUTDIR

if [ -f $OUTFILE ]
then
	rm -rf $OUTDIR/*
fi

echo -n "TestName" >> $OUTFILE
if [ -x $JAVA ]
then
	echo -n ", Java" >> $OUTFILE
fi

if [ -x $CC ]
then
	echo -n ", C" >> $OUTFILE
fi

if [ -x $PY ]
then
	echo -n ", Python" >> $OUTFILE
fi

if [ -x $BASH ]
then
	echo -n ", Bash" >> $OUTFILE
fi

echo "" >> $OUTFILE

for GREEN in $BASEDIR/*.green
do
	echo -n `basename $GREEN` >> $OUTFILE
	TestJava `basename $GREEN`
	echo -n ", $?" >> $OUTFILE
	TestC `basename $GREEN`
	echo -n ", $?" >> $OUTFILE
	TestPython `basename $GREEN`
	echo -n ", $?" >> $OUTFILE
	TestBash `basename $GREEN`
	echo -n ", $?" >> $OUTFILE
	echo "" >> $OUTFILE
done

cat $OUTFILE

