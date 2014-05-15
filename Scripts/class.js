/** 
 * @function Class
 * @constructor
 *
 * Class creator
 * 
 * @param prototype {Object} The prototype object
 *
 * @returns {Function} constructor
**/
function Class( prototype ) {
   prototype         = prototype || {};
   var parent        = typeof prototype.Extends == 'function' ? prototype.Extends.prototype : {};
   // create our constructor - use provided `initialize`
   // method or create empty function
   var constructor   = function () {
      var params        = [].slice.call( arguments );
      // get the constructor function
      var fn            = (prototype.initialize || parent.initialize || function () {});
      // create empty function that we will use for the real constructor
      var empty         = function () {};
      // link prototypes
      empty.prototype   = constructor.prototype;
      // create the new instance; `instance` will inherit the `constructor` prototype
      var instance      = new empty();
      // execute the constructor function, changing the context with the `instance`
      var return_val    = fn.apply( instance, params );
      // In case the return result of the constructor fn is object, return this object.
      // Otherwise return the `instance`.
      return typeof( return_val ) == 'object' ? return_val : instance;
   }
   // set the prototype object
   // inherit properties & methods from the parent class
   constructor.prototype = extend( {}, parent, prototype );
   // set name to all annonymous functions
   for ( var name in constructor.prototype ) {
      if ( typeof( constructor.prototype[ name ] ) == 'function' ) {
         // set the same name as the key
         constructor.prototype[ name ].__name__ = name;
      }
   }
   // make parent method calling available via `this.parent()`
   constructor.prototype.parent = function () {
      var fn = parent[ arguments.callee.caller.__name__ ];
      if ( typeof fn !== 'function' ) {
         throw new Error('Cannot call `parent`');
      }
      return fn.apply( this, arguments );
   }
   return constructor;
}