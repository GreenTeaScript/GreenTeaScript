#include "GreenTeaPlus.h"
struct X {
	// struct record* __base;
};
struct X* NEW_X() {
	struct X* self = GT_New(struct X*);
	return self;
};

