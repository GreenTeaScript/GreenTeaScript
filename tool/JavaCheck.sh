#!/bin/bash

Report() {
	if [ $1 -eq 0 ]
	then
		echo "OK"
	else
		echo "FAILED($1)"
	fi
}

TestScript() {
	echo -n "testing $1 ..."
	java -ea -jar GreenTeaScript.jar $1 1> /dev/null 2> /dev/null
	Report $?
}

TestDir() {
	for TPATH in $1/*.green
	do
		TestScript $TPATH
	done
}

Main() {
	TestDir "test/common"
	TestDir "test/java"
	TestDir "test/dshell"
	TestDir "test/stress"
}

Main
