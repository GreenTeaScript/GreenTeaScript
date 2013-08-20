#include "GreenTea.h"
struct X {
   // struct record* __base;
   struct X* next;
};
struct X* NEW_X() {
   struct X* self = GT_New(struct X*);
   self->next = NULL;
   return self;
};

