#!/bin/bash

assert() {
    eval $1
    if (( $? != 0 )) ;then
        local line=${BASH_LINENO[0]}
        local src=${BASH_SOURCE[1]}
        local func=${FUNCNAME[0]}
        echo "Assertion Error at $src line $line" >&2
    fi
}

# assert "(( 12 < 2))"

concat() {
    local x=$1
    local y=$2
    echo $x$y
    return 0
}

# concat $A $b

eqstr() {
    local x=$1
    local y=$2

    if [ "$x" = "$y" ]; then
        return 0
    else
        return 1
    fi
}

# eqstr "you" "you"

ltInt() {
    (( $1 < $2 ))
    return $?
}

lteInt() {
    (( $1 <= $2 ))
    return $?
}

gtInt() {
    (( $1 > $2 ))
    return $?
}

gteInt() {
    (( $1 >= $2 ))
    return $?
}

eqInt() {
    (( $1 == $2 ))
    return $?
}

neInt() {
    (( $1 != $2 ))
    return $?
}

assignBool() {
    eval $1
    local ret=$?
    echo ret$
    return 0
}
