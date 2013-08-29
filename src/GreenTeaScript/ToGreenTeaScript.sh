#!/bin/sh

SourceDir=src/org/GreenTeaScript/
build=src/GreenTeaScript/

source=
source="${source} GreenTeaScript"
source="${source} GreenTeaTopObject"
source="${source} GreenTeaScriptTest"
source="${source} SourceGenerator"
source="${source} BashSourceGenerator"
source="${source} JavaScriptSourceGenerator"
source="${source} CSourceGenerator"
source="${source} JavaSourceGenerator"
source="${source} PerlSourceGenerator"
source="${source} PythonSourceGenerator"

out=""

for s in ${source}; do
    perl src/TypeScript/ToTypeScript.pl < ${SourceDir}${s}.java > ${build}${s}.green
    out="${out} ${build}${s}.green"
done
