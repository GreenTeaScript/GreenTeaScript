(error) (eval:2) Undefined method: f
static int g__A(int a0, int b1, int c2){
   return a0 + throw Error("(error) (eval:2) Undefined method: f");
}
static int f__B(int a0, int b1){
   return a0 + b1;
}
{
   g__A(30,20,10);
}
