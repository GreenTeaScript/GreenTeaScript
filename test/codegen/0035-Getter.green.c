#include "GreenTeaPlus.h"
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


