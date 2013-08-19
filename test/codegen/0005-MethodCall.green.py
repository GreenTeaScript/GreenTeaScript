def f__AFAF(a__AA, b__AB):
    return (a__AA + b__AB)


def g__AFAFAF(a__AA, b__AB, c__AC):
    return (a__AA + f__AFAF(c__AC, b__AB))


g__AFAFAF(30, 20, 10)

