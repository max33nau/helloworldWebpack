'use strict';
import template from './editPlayer.html';

export default function( ngModule ) {
	ngModule.directive( 'editPlayer', function(){
		return {
			replace: true,
			restrict: 'E',
			template,
    	scope: {
        editingPlayer: '=',
        playerModel: '='
			}
		};
	});
}
