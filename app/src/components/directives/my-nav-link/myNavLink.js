'use strict';
import template from './myNavLink.html';
import style from './myNavLink.scss';

export default function( ngModule ) {
	ngModule.directive( 'myNavLink', function(){
		return {
			replace: true,
			restrict: 'E',
			template,
      scope: {
        state: '@',
        pageName: '@'
      },
			controller: function($scope) {
				$scope.styles = style;
				console.log($scope.styles);
			}
		};
	});
}
