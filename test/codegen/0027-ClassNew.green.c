#include "GreenTea.h"
typedef struct X *X;
struct X {
   record __base;
};
static X constructor__01205(X this0, int x1){
   ;
   return this0;
}
static void f__03(){
   constructor__01205(GC_new(X), 10);
}

