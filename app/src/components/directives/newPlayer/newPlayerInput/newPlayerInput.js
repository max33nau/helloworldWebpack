'use strict';
import template from './newPlayerInput.html';

export default function( ngModule ) {
	ngModule.directive( 'newPlayerInput', function(){
		return {
			replace: true,
			restrict: 'E',
			template,
      scope: {
        inputName: '@',
        inputType: '@',
        inputModel: '='
      }
		};
	});
}
