/* Extension Basic Sphere Commands */
/* Steve Wolfort , July 2019 */

new (function() {
    var ext = this;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };


    // SPHERO CONNECTION CODE
	var sphero = require("sphero"),
    		orb = sphero("/dev/rfcomm0"); // change port accordingly

orb.connect(function() {
  // roll Sphero forward
  orb.roll(150, 0);

  // turn Sphero green
  orb.color("green");

  // have Sphero tell you when it detect collisions
  orb.detectCollisions();

  // when Sphero detects a collision, turn red for a second, then back to green
  orb.on("collision", function(data) {
    console.log("collision detected");
    console.log("  data:", data);

    orb.color("red");

    setTimeout(function() {
      orb.color("green");
    }, 100);
  });
});

    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    
    ext.wait_random = function(callback) {
        wait = Math.random();
        console.log('Waiting for ' + wait + ' seconds');
        window.setTimeout(function() {
            callback();
        }, wait*5000);
    };
    
    ext.sphero_roll = function(sph_degrees, sph_speed, sph_secs) {
        wait = Math.random();
        console.log('Waiting for ' + wait + ' seconds');
        window.setTimeout(function() {
		callback();
        }, wait*5000);
    };




    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'wait for random time', 'wait_random'],
            [' ', 'Sphere-Roll', 'sphero_roll'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Sphero SPRK extension', descriptor, ext);
})();