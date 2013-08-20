def f__AFAF(a__AA, b__AB):
    n__AC = 1
    if (a__AA < 10):
        if (b__AB < 100):
            n__AC = (n__AC + 2)
        else:
            n__AC = (n__AC + 4)
        
        n__AC = (n__AC + 6)
    else:
        if (b__AB < 200):
            n__AC = (n__AC + 20)
        else:
            n__AC = (n__AC + 40)
        
        n__AC = (n__AC + 60)
    
    n__AC = (n__AC + 200)
    return n__AC


f__AFAF(10000, 20000)

