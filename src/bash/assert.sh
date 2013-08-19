#!/bin/bash

function assert() {
    eval $1
    if (( $? != 0 )) ;then
        echo "Assertion Error" >&2
    fi
}

# assert "(( 12 < 2))"
