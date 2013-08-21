#include "GreenTeaPlus.h"
struct X {
   // struct record* __base;
};
struct X* NEW_X() {
   struct X* self = GT_New(struct X*);
   return self;
};
struct Y {
   // struct record* __base;
};
struct Y* NEW_Y() {
   struct Y* self = GT_New(struct Y*);
   return self;
};
static int f__AN(struct Y* self){
   return 10;
}

