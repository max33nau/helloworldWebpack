'use strict';
import template from './myNavLink.html';

export default function( ngModule ) {
	ngModule.directive( 'myNavLink', function(){
		return {
			replace: true,
			restrict: 'E',
			template,
      transclude: true,
      scope: {
        state: '@',
        pageName: '@'
      }
		};
	});
}
