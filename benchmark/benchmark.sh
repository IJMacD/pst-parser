#!/bin/sh

set -e

commits=$(git log --pretty='format:%h' -n 4)

for commit in $commits
do
    git checkout $commit;
    node ./benchmark/benchmark.js "$1" > output-$commit
done