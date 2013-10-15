#!/bin/bash

LOGFILE="JavaCheck.log"

Report() {
	if [ $1 -eq 0 ]
	then
		echo "OK"
	else
		echo "FAILED($1)"
		cat $2 >> $LOGFILE
	fi
}

TestScript() {
	echo -n "testing $1 ..."
	echo "java -ea -jar GreenTeaScript.jar $1" 1>> $LOGFILE
	java -ea -jar GreenTeaScript.jar $1 1> /dev/null 2>> $LOGFILE
	Report $? $1
}

TestDir() {
	for TPATH in $1/*.$2
	do
		TestScript $TPATH
	done
}

Main() {
	ant clean
	if [ -f "$LOGFILE" ]
	then
		rm -f $LOGFILE
	fi
	ant
	TestDir "test/common" green
	TestDir "test/java" green
	TestDir "test/dshell" ds
	TestDir "test/stress" green
}

Main
