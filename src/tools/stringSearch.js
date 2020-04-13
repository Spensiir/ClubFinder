export function editDistance(str1, str2) {
    // instead of computing the edit distance for the entire length of both strings
    // this algorithm considers the entire string of the first arg
    // and only considers up to str1.length chars of the 2nd arg

    // it is assumed str1.length <= str2.length
    var T =  Array(str1.length + 1).fill(0).map(x => Array(str1.length + 1).fill(0));
    for (var i=0; i <= str1.length; i++) {
        T[0][i] = i;
    }

    for (i=0; i <= str1.length; i++) {
        T[i][0] = i;
    }

    //solving it bottom-up manner
   var m = str1.length;
   var n = str1.length;
   for (i = 1; i <= m; i++) {
       for (var j = 1; j <= n; j++) {
           //If last characters are matching, ignore the last character
           // then the solution will be same as without the last character.
           if (str1.charAt(i-1)===str2.charAt(j-1)) {
               T[i][j] = T[i-1][j-1];
           } else {
               T[i][j] = 1 + Math.min(T[i][j-1], Math.min(T[i-1][j], T[i-1][j-1]));
           }
        }
   }

   // the return value is a ration of the number of changes needed over the length
   // of the first arg
   return T[str1.length][str1.length] / str1.length;
}
