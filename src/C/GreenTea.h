#include <assert.h>
#include <stdbool.h>
#include <stdint.h>
#include "gc.h"

#ifndef GREEN_TEA_H
#define GREEN_TEA_H

typedef struct GreenTeaObject {
  uint32_t header;
} *GreenTeaObject;

typedef struct record {
  struct GreenTeaObject base;
} record;

#define GT_SizeOf(TYPE) (sizeof(*(TYPE)NULL))
#define GT_New(TYPE) ((TYPE) GC_malloc(GT_SizeOf(TYPE)))
#define GT_GetField(TYPE, THIS, FIELD) (((TYPE) THIS)->FIELD)

#endif /* end of include guard */
