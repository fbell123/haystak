describe('haystak', function (){
  var storage, pair;


  beforeEach( function () {
    // var store = {};
    storage = {

      getItem: function() {
        // return pair;
      },

      setItem: function(key, value) {
        // pair = key + ": " + value;
      },

      // key: function(key) {
      //   return key;
      // }
    };
    // var dummyElement = document.createElement('div');
    // document.getElementById = jasmine.createSpy('HTML Element').andReturn(dummyElement);

    spyOn(storage, "getItem").and.returnValue( 'www.google.co.uk');

  });



  it('function is called', function () {
    storage.getItem();
    expect(storage.getItem).toHaveBeenCalled();
  });

  it('function is called with a key', function () {
    storage.getItem('List');
    expect(storage.getItem).toHaveBeenCalledWith('List');
  });

});
