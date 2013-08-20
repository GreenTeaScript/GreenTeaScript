#!/bin/bash

GREENTEA='java -jar GreenTeaScript.jar'
BASEDIR="test/exec"
OUTDIR="test-result"
SRCDIR="src"
OUTFILE="$OUTDIR/TestResult.csv"

CC=`which gcc`
PY=`which python`

TestC() {
if [ -x $CC ]
then
	$GREENTEA -o $OUTDIR/$1.c $BASEDIR/$1
	$CC -I$SRCDIR/C/ -o $OUTDIR/$1.exe $OUTDIR/$1.c
	if [ -x "$OUTDIR/$1.exe" ]
	then
		./$OUTDIR/$1.exe
		return $?
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

mkdir -p $OUTDIR

if [ -f $OUTFILE ]
then
	rm -rf $OUTDIR/*
fi

echo -n "TestName" >> $OUTFILE
if [ -x $CC ]
then
	echo -n ", C" >> $OUTFILE
fi

if [ -x $PY ]
then
	echo -n ", Python" >> $OUTFILE
fi
echo "" >> $OUTFILE

for GREEN in $BASEDIR/*.green
do
	echo -n `basename $GREEN` >> $OUTFILE
	TestC `basename $GREEN`
	echo -n ", $?" >> $OUTFILE
	TestPython `basename $GREEN`
	echo -n ", $?" >> $OUTFILE
	echo "" >> $OUTFILE
done

