/*
* custom regex functions
*/
RegExp.escape = function(string) {
  return string.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, "\\$&");
};

RegExp.searchReg = function(string){
        string = RegExp.escape(string);
        return new RegExp(string.replace(" ","|"), "i");
};