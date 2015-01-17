// Copyright 2002-2013, University of Colorado Boulder

/**
 * Control panel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var VBox = require( 'SCENERY/nodes/VBox' );
	var Vector2 = require( 'DOT/Vector2' );

  // strings
  var flipPolarityString = require( 'string!EXAMPLE_SIM/flipPolarity' );
	var moveBarString = require( 'string!EXAMPLE_SIM/moveBar' );
	var addBarString = require( 'string!EXAMPLE_SIM/addBar' );

  /**
   * Control panel constructor
   * @param {BarMagnetModel} model the entire model for the bar magnet screen
   * @param {Object} [options] scenery options for rendering the control panel, see the constructor for options.
   * @constructor
   */
  function ControlPanel( model, options ) {
		
		var self = this;

    // Demonstrate a common pattern for specifying options and providing default values.
    options = _.extend( {
        xMargin: 10,
        yMargin: 10,
        stroke: 'orange',
        lineWidth: 3
      },
      options );

    // 'Flip Polarity' button
    var flipButton = new TextPushButton( flipPolarityString, {
      font: new PhetFont( 16 ),
      baseColor: 'yellow',
      xMargin: 10,
      listener: function() {
        model.barMagnet.orientation += Math.PI;
      }
    } );
		
		// 'Move bar magnet' button, randomly places the main bar magnet
		// the view's origin (0,0) lies at the center of the screen
		var moveBarButton = new TextPushButton( moveBarString, {
			font: new PhetFont( 16 ),
      baseColor: 'green',
      xMargin: 10,
      listener: function() {
				var randPos = new Vector2( Math.random()*768 - 768/2, Math.random()*504 - 504/2 );
				var randRot = Math.random() * Math.PI * 2;
        model.barMagnet.location = randPos;
				model.barMagnet.orientation = randRot;
      }
		});
		
		// 'Add bar magnet' button, adds a randomly placed magnet to the view
		// magnets added in this way are not effected by 'Flip Polarity' or 'Move bar magnet' buttons
		var addBarButton = new TextPushButton( addBarString, {
			font: new PhetFont( 16 ),
      baseColor: 'blue',
      xMargin: 10,
      listener: function() {
				var exampleScreenView = self.parents[0];
				exampleScreenView.addBar(model.makeRandBar());
      }
		});

    // 'Reset All' button, resets the sim to its initial state
    var resetAllButton = new ResetAllButton( { 
			listener: function() { 
				var exampleScreenView = self.parents[0];
				exampleScreenView.removeExtraBars();
				model.reset(); 
			} 
		} );

    // The contents of the control panel
    var content = new VBox( { align: 'center', spacing: 10, children: [ flipButton, moveBarButton, addBarButton, resetAllButton ] } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, ControlPanel );
} );