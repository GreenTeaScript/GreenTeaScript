#include <assert.h>
#include <stdbool.h>
#include <stdint.h>
#include <string.h>
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

typedef char *String;

#define GT_SizeOf(TYPE) (sizeof(*(TYPE)NULL))
#ifdef USE_GC
#define GT_New(TYPE) ((TYPE) GC_malloc(GT_SizeOf(TYPE)))
#else
#define GT_New(TYPE) ((TYPE) malloc(GT_SizeOf(TYPE)))
#endif
#define GT_GetField(TYPE, THIS, FIELD) (((TYPE) THIS)->FIELD)

static String greentea_strcat(String x, String y) {
  size_t leftLen  = strlen(x);
  size_t rightLen = strlen(y);
  size_t len = leftLen + rightLen;
  String ret = (String) malloc(len);
  memcpy(ret, x, leftLen);
  memcpy(ret + leftLen, y, rightLen);
  return ret;
}

#endif /* end of include guard */
