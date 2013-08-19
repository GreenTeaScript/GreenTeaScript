#include "GreenTea.h"
struct struct X {
   struct record __base;
   int a;
};
struct struct Y {
   struct X __base;
   int b;
   int c;
};
static int f__AM(struct X* x__AA){
   return x__AA->a;
}
static int g0__AN(struct Y* y__AA){
   return GT_GetField(struct X*, y__AA, a);
}
static int g1__AN(struct Y* y__AA){
   return y__AA->b;
}
static int g2__AN(struct Y* y__AA){
   return y__AA->c;
}

