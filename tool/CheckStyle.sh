#!/bin/sh

SOURCE=
for DIR in src ext Test
do
	for EXT in java
	do
		SOURCE="${SOURCE} `find ${DIR}/ -iname "*.${EXT}"`"
	done
done

for F in ${SOURCE}
do
	konoha -MFuelVM ./tool/CheckStyle.k ${F}
done
