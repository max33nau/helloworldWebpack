'use strict';
import template from './mainNav.html';

export default function( ngModule ) {
	ngModule.directive( 'mainNav', function(){
		return {
			replace: true,
			restrict: 'E',
			template,
      transclude: true,
      link: function(scope, element, attributes) {
        scope.navTitle = attributes.navTitle;
      }
		};
	});
}
