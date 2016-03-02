'use strict';
import template from './playerLabel.html';

export default function( ngModule ) {
	ngModule.directive( 'playerLabel', function(){
		return {
			replace: true,
			restrict: 'E',
      transclude: true,
			template,
    	scope: {
        labelName: '@',
        labelValue: '=',
        hideLabel: '='
			}
		};
	});
}
