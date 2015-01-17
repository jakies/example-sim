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
		var layoutWidth = 768;
		var layoutHeight = 504;
    ScreenView.call( exampleScreenView, { layoutBounds: new Bounds2( 0, 0, layoutWidth, layoutHeight ) } );

    // model-view transform
    var modelViewTransform = ModelViewTransform2.createOffsetScaleMapping(new Vector2(layoutWidth / 2, layoutHeight / 2), 1);

    exampleScreenView.addChild( new BarMagnetNode( model.barMagnet, modelViewTransform ) );
    exampleScreenView.addChild( new ControlPanel( model, { x: 50, y: 50 } ) );
  }

  return inherit( ScreenView, ExampleScreenView, {
		// Add a new bar to the view
		addBar: function(bar) {
			var scaleVector = new Vector2(768/2, 504/2);
			var modelViewTransform = ModelViewTransform2.createOffsetScaleMapping(scaleVector, 0.72);
			this.children = [new BarMagnetNode(bar, modelViewTransform)].concat(this.children);
		},
		
		// Remove all but the last two elements
		removeExtraBars: function() {
			this.children = this.children.slice(-2);
		}
	
	});
} );