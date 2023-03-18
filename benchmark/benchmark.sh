#!/bin/sh

set -e

commits=$(git log --no-merges --pretty='format:%h' master ^HEAD)

for commit in $commits
do
    git checkout $commit;
    node ./benchmark/benchmark.js "$1" > output-$commit
done