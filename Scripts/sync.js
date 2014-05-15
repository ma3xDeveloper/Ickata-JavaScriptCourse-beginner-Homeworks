( function () {
   /** 
    * @class Base
    *
    * Provides common interface for Sync & Async
    *
    * @param callbacks  {Array}     Array of callback functions to execute
    * @param oncomplete {Function}  Function to execute when all callbacks finish
   **/
   var Base = new Class({
      
      is_running : false,
      
      initialize : function ( callbacks, oncomplete ) {
         this.callbacks    = [].slice.call(callbacks);   // make a copy
         this.oncomplete   = oncomplete || function () {};
      },
      
      /**
       * @method run
       *
       * Starts execution
      **/
      run : function () {
         if ( this.is_running ) {
            return;
         }
         this.is_running = true;
         this._execute();
      },
      
      /**
       * @method ready
       *
       * Marks a single callback as ready
      **/
      ready : function () {
         
      },
      
      _execute : function () {
         
      }
      
   });
   
   /** 
    * @class Sync
    *
    * Executes bunch of callbacks one after another
    * When all callbacks are done, executes onComplete callback
   **/
   this.Sync = new Class({
      
      Extends  : Base,
      
      _execute : function () {
         // execute first callback from the list
         var callback = this.callbacks.shift();
         if ( callback ) {
            callback( this );    // execute the callback, pass reference to Sync obj
         } else {
            this.oncomplete();   // execute onComplete callback
         }
      }, 
      
      ready : function () {
         // continue with next callback
         this._execute();
      }
      
   });
   
   /** 
    * @class Async
    *
    * Executes bunch of callbacks at the same time
    * When all callbacks are done, executes onComplete callback
   **/
   this.Async = new Class({
      
      Extends  : Base,
      
      _execute : function () {
         // start executing all callbacks
         for ( var i=0, l=this.callbacks.length; i<l; i += 1 ) {
            this.callbacks[i]( this ); // execute callback, pass reference to Async obj
         }
      },
      
      ready : function () {
         // check if all callbacks completed, if yes - call the `oncomplete` function
         this.callbacks.shift();
         if ( ! this.callbacks.length ) {
            this.oncomplete();
         }
      }
      
   });
   
})();