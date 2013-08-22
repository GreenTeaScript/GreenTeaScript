#include "GreenTeaPlus.h"
struct X {
   // struct record* __base;
};
struct X* NEW_X() {
   struct X* self = GT_New(struct X*);
   return self;
};
static struct X* constructor__AMAF(struct X* self, int x__AB){
   ;
   return self;
}

static void f__AD(){
   constructor__AMAF(NEW_X(), 10);
}


