#include "GreenTea.h"
typedef struct X *X;
struct X {
   record __base;
   int a;
};
typedef struct Y *Y;
struct Y {
   X __base;
   int b;
   int c;
};

