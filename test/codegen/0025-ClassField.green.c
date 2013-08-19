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

