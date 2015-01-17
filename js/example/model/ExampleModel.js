// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the 'Example' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BarMagnet = require( 'EXAMPLE_SIM/example/model/BarMagnet' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * Main constructor for ExampleModel, which creates the bar magnet.
   * @constructor
   */
  function ExampleModel() {

    // model elements
    this.barMagnet = new BarMagnet( new Vector2( 0, 0 ), new Dimension2( 262.5, 52.5 ), 0 );
		console.log(this);
  }

  return inherit( Object, ExampleModel, {

    // Resets all model elements
    reset: function() {
      this.barMagnet.reset();
    },
		
		// Constructs a random bar
		makeRandBar: function() {
			return new BarMagnet(new Vector2(Math.random()*768 - 768/2, Math.random()*504 - 504/2), new Dimension2(262.5, 52.5), Math.random() * Math.PI * 2);
		},

    // Called by the animation loop. Optional, so if your model has no animation, you can omit this.
    step: function() {
      // Handle model animation here.
    }
  } );
} );