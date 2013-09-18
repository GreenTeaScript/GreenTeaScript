# build:  do static checking and build of js
# test:   test both implementations, typescript and java
# testts: test python implementation
# testj:  test javascript implementation
.SILENT:
JavaBin="./GreenTeaScript.jar"
INSTALL_PREFIX="$(HOME)/bin"
TEST_BASEDIR="test/exec"
TEST_OUTDIR="$(TEST_BASEDIR)/test-result"

TEST_FILES:=$(wildcard test/exec/*.green)

all: build test

build: buildj buildts

dist: distj distts

#test: testj testpy
	#sh tool/ReleaseCheck.sh

buildj: $(JavaBin)
	echo Build GreenTeaScript;

check_java_env:
	java -version > /dev/null
	ant -version  > /dev/null

$(JavaBin): check_java_env
	echo Building Java implementation
	ant jar

buildpy:
	echo Building Python implementation
	python --version  > /dev/null
	bash ./tool/ToPython

buildts:
	echo Building TypeScript implementation
	ruby -v > /dev/null
	node -v > /dev/null
	tsc -v  > /dev/null
	bash ./tool/ToTypeScript

testj:
	echo Testing Java implementation
	python ./tool/TestAll.py --target=c

testpy:
	echo Testing Python implementation
	python ./tool/TestAll.py --target=python

testts: buildts
	echo Testing JavaScript implementation...
	python ./tool/TestAll.py --target=js

distj: buildj
	echo Distribution for Java implementation
	mkdir -p generated/jar/
	cp $(JavaBin) generated/jar/

distts: buildts
	echo Distribution for JavaScript implementation
	mkdir -p generated/js/
	cp src/TypeScript/*.ts generated/js/
	cp src/TypeScript/*.js generated/js/

clean:
	-rm -rf bin/*.class *.jar GTAGS GPATH GRTAGS

install: installj

installj: distj
	echo Installing Java implementation
	install -d $(INSTALL_PREFIX)
	cp -f generated/jar/GreenTeaScript.jar $(INSTALL_PREFIX)/
	install -m 755 tool/greentea $(INSTALL_PREFIX)/greentea
	install -d $(INSTALL_PREFIX)/../include
	cp -f include/c/*.h $(INSTALL_PREFIX)/../include/

test: buildj $(notdir $(TEST_FILES))
	cat $(TEST_OUTDIR)/*.green.csv >> $(TEST_OUTDIR)/TestResult.csv

test_prepare:
	bash tool/ReleaseCheck2.sh --reset $(TEST_OUTDIR)/TestResult.csv

$(notdir $(TEST_FILES)): test_prepare
	bash tool/ReleaseCheck2.sh $(TEST_BASEDIR)/$@ $(TEST_OUTDIR)/$@.csv

.PHONY: all build buildj buildts test testp testj clean dist buildj buildts installj
