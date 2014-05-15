/** 
 * @class Storage
 *
 * Creates local storage object that provides setters/getters for
 * storing/retrieving data.
 *
**/
function Storage() {
   var data = {};   // private object to store our data
   
   this.get = function ( name ) {
      return data[ name ];
   };
   this.set = function ( name, value ) {
      data[ name ] = value;
   };
   this.getMultiple = function ( names ) {
      var result = [];  // create empty results array
      // loop passed `names` array & populate the `result`
      for ( var i=0, l=names.length; i<l; i += 1 ) {
         result.push( data[ names[i] ] );
      }
      return result;
   };
   this.setMultiple = function ( pairs ) {
      extend( data, pairs );
   };
}