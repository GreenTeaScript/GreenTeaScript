#include <assert.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>

#ifdef USE_GC
#include "gc.h"
#endif

#ifndef GREEN_TEA_H
#define GREEN_TEA_H

typedef struct GreenTeaObject {
  uint32_t header;
} *GreenTeaObject;

typedef struct record {
  struct GreenTeaObject base;
} record;

#define GT_SizeOf(TYPE) (sizeof(*(TYPE)NULL))
#ifdef USE_GC
#define GT_New(TYPE) ((TYPE) GC_malloc(GT_SizeOf(TYPE)))
#else
#define GT_New(TYPE) ((TYPE) malloc(GT_SizeOf(TYPE)))
#endif
#define GT_GetField(TYPE, THIS, FIELD) (((TYPE) THIS)->FIELD)

#endif /* end of include guard */
