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

// (error) (/Users/masa/src/GreenTeaScript/test/codegen/0035-Getter.green:9) type error: requested = int, given = void

static int f__51(struct X* x__0){
   return x__0->a;
}

// (error) (/Users/masa/src/GreenTeaScript/test/codegen/0035-Getter.green:12) type error: requested = int, given = void

static int g0__52(struct Y* y__0){
   return GT_GetField(struct X*, y__0, a);
}

// (error) (/Users/masa/src/GreenTeaScript/test/codegen/0035-Getter.green:15) type error: requested = int, given = void

static int g1__53(struct Y* y__0){
   return y__0->b;
}

// (error) (/Users/masa/src/GreenTeaScript/test/codegen/0035-Getter.green:18) type error: requested = int, given = void

static int g2__54(struct Y* y__0){
   return y__0->c;
}

