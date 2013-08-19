#include "GreenTea.h"
typedef struct X *X;
struct X {
   struct record __base;
   int a;
};
typedef struct Y *Y;
struct Y {
   struct X __base;
   int b;
   int c;
};
static int f__AM(X x__AA){
   return x__AA->a;
}
static int g0__AN(Y y__AA){
   return GT_GetField(X, y__AA, a);
}
static int g1__AN(Y y__AA){
   return y__AA->b;
}
static int g2__AN(Y y__AA){
   return y__AA->c;
}

