#include "GreenTeaPlus.h"


static int f__45(int a__0, int b__1){
   int n__2 = 1;
   {
      if((a__0 < 10)) {
         if((b__1 < 100)) {
            n__2 = (n__2 + 2);
         } else {
            n__2 = (n__2 + 4);
         };
         n__2 = (n__2 + 6);
      } else {
         if((b__1 < 200)) {
            n__2 = (n__2 + 20);
         } else {
            n__2 = (n__2 + 40);
         };
         n__2 = (n__2 + 60);
      };
      n__2 = (n__2 + 200);
      return n__2;
   };
}

