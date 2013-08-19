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

#define GC_new(TYPE) ((TYPE) GC_malloc(sizeof(*(Point)NULL)))

#endif /* end of include guard */
