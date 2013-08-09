# build:  do static checking and build of js
# test:   test both implementations, typescript and java
# testts: test python implementation
# testj:  test javascript implementation

JavaBin="./GreenTeaScript.jar"

all: build test

build: buildj buildts

test: testj testp

buildj: $(JavaBin)
	echo Build GreenTeaScript;

check_java_env:
	@java -version >& /dev/null
	@ant -version  >& /dev/null

$(JavaBin): check_java_env
	@echo Building Java implementation
	@ant jar

buildts:
	echo Building TypeScript implementation
	@ruby -v > /dev/null
	@node -v > /dev/null
	@tsc -v  > /dev/null
	cd src/TypeScript;\
	sh ToTypeScript.sh

testj:
	echo Testing Java implementation
	python ./tool/TestAll.py --target=c

testts: buildts
	echo Testing javascript implementation...
	python ./tool/TestAll.py --target=js

clean:
	-rm -rf bin $(JavaBin)

.PHONY: all build buildj buildts test testp testj clean
