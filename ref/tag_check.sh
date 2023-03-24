#!/bin/sh

tag_file="./ref/unknown_tags.txt"

while read -r tag;
do
    grep -i $tag ./src/ltp/Tags.js;

    grep -i $tag ./ref/ptags.h;
    grep -i $tag ./ref/MAPITags.h;
    grep -i $tag ./ref/outlook.pst.man;
    grep -i -B 2 $tag ./ref/ms-oxprops-210817.txt;
    grep -i -B 1 $tag ./ref/ms-oxprops-100505.txt;
    grep -i $tag ./ref/libfmapi_property_type.c
    grep -i $tag ./ref/mapi-named-properties.txt
    grep -i $tag ./ref/MAPI-named.cpp
    grep -i -A 2 $tag ./ref/Message\ API\ \(MAPI\)\ definitions.txt
    grep -i $tag ./ref/outlook.pst.man
done < "$tag_file"