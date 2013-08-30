#include "GreenTeaPlus.h"
struct X {
   // struct record* __base;
};
struct X* NEW_X() {
   struct X* self = GT_New(struct X*);
   return self;
};


static struct X* constructor__45(struct X* self, int x__1){
   ;
   return self;
}

// (error) (/Users/masa/src/GreenTeaScript/test/codegen/0027-ClassNew.green:7) type error: requested = X, given = int

static void f__46(){
   constructor__45(NEW_X(), 10);
   return;
}

