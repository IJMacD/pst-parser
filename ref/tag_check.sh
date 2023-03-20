#!/bin/sh

tag_file="./ref/unknown_tags.txt"

while read -r tag;
do
    grep -i $tag ./src/ltp/Tags.js;

    grep -i $tag ./ref/ptags.h;
    grep -i $tag ./ref/MAPITags.h;
    grep -i -B 2 $tag ./ref/ms-oxprops-210817.txt;
    grep -i -B 1 $tag ./ref/ms-oxprops-100505.txt;
done < "$tag_file"