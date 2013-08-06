int g(int a, int b, int c) {
    return a + f(b, c);
}

int f(int a, int b) {
    return a + b;
}

g(10, 20, 30);
