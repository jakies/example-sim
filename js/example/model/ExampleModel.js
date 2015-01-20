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
  var Events = require( 'AXON/Events' );

  /**
   * Main constructor for ExampleModel, which creates the bar magnet.
   * @constructor
   */
  function ExampleModel() {
    
    // Helper to construct new bars
    this.barFactory = function() {
      return new BarMagnet( new Vector2( 0, 0 ), new Dimension2( 262.5, 52.5 ), 0 );
    }

    // model elements
    this.barMagnet = this.barFactory();
    this.events = new Events();
    this.extraBars = [];
  }

  return inherit( Object, ExampleModel, {

    // Resets all model elements
    reset: function() {
      this.barMagnet.reset();
      this.events.trigger( "removeExtraBars" );
    },
    
    // Add bar by dispatching addBar event to ExampleScreenView
    addBar: function() {
      this.extraBars.unshift( this.barFactory().randomizePos(null, null, true) );
      this.events.trigger( "addBar" );
    },

    // Called by the animation loop. Optional, so if your model has no animation, you can omit this.
    step: function() {
      // Handle model animation here.
    }
  } );
} );