#!/bin/sh
cd $(dirname "$0")

TAR='wn3.1.dict.tar.gz'
curl "http://wordnetcode.princeton.edu/$TAR" -o "$TAR"
tar xvf "$TAR"
rm $TAR
