static int f__A(int a0, int b1){
   return a0 + b1;
}
static int g__B(int a0, int b1, int c2){
   return a0 + f__A(c2 ,b1);
}
g__B(30 ,20 ,10);

