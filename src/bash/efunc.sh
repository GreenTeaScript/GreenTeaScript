#!/bin/bash

function assert() {
    eval $1
    if (( $? != 0 )) ;then
        echo "Assertion Error" >&2
    fi
}

# assert "(( 12 < 2))"

function concat() {
    local x=$1
    local y=$2
    echo $x$y
    return 0
}

# concat $A $b
