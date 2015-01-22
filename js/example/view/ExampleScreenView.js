// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the 'Example' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BarMagnetNode = require( 'EXAMPLE_SIM/example/view/BarMagnetNode' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ControlPanel = require( 'EXAMPLE_SIM/example/view/ControlPanel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Constructor for the ExampleScreenView, it creates the bar magnet node and control panel node.
   * @param {BarMagnetModel} model the model for the entire screen
   * @constructor
   */
  function ExampleScreenView( model ) {

    var exampleScreenView = this;
    ScreenView.call( exampleScreenView, { layoutBounds: new Bounds2( 0, 0, 768, 504 ) } );

    // model-view transform
    var modelViewTransform = ModelViewTransform2.createOffsetScaleMapping( new Vector2( exampleScreenView.layoutBounds.width / 2, exampleScreenView.layoutBounds.height / 2 ), 1 );
    
    // default elements
    var defaultElements = [
      new BarMagnetNode( model.barMagnet, modelViewTransform ),
      new ControlPanel( model, { x: 50, y: 50 } )
    ]
    
    exampleScreenView.setChildren( defaultElements );

    // Add the last bar prepended to model.extraBars
    model.events.on("addBar", function( bar ) {
      exampleScreenView.insertChild( 0, new BarMagnetNode(bar, modelViewTransform) );
    });
    
    // Reset view children to defaultElements
    model.events.on("resetViewChildren", function() {
      exampleScreenView.setChildren( defaultElements );
    });
  }

  return inherit( ScreenView, ExampleScreenView );
} );