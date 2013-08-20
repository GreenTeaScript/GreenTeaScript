#include "GreenTea.h"
struct X {
   // struct record* __base;
   int a;
};
struct X* NEW_X() {
   struct X* self = GT_New(struct X*);
   self->a = 0;
   return self;
};
struct Y {
   // struct X* __base;
   int a;
   int b;
   int c;
};
struct Y* NEW_Y() {
   struct Y* self = GT_New(struct Y*);
   self->a = 0;
   self->b = 0;
   self->c = 0;
   return self;
};

