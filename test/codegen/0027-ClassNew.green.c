#include "GreenTeaPlus.h"
struct X {
	// struct record* __base;
};
struct X* NEW_X() {
	struct X* self = GT_New(struct X*);
	return self;
};

// (error) (/Users/masa/src/GreenTeaScript/test/codegen/0027-ClassNew.green:7) no constructor: X

static void f__152(){
	throw Error("(error) (/Users/masa/src/GreenTeaScript/test/codegen/0027-ClassNew.green:7) no constructor: X");
}

