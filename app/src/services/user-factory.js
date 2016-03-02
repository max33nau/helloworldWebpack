'use strict';
export default function( ngModule ) {
	ngModule.factory( 'User', [ '$window','$rootScope','$auth', function( $window, $rootScope, $auth ) {
		return {
			logIn(userInfo) {
				$window.localStorage.username = userInfo.name;
        $window.localStorage.token = userInfo.token;
        $rootScope.currentUser = $window.localStorage.username;
			},
      checkLogInStatus() {
        if(!!$window.localStorage.username) {
          $rootScope.currentUser = $window.localStorage.username;
        }
      },
      logout() {
        $window.localStorage.username = null;
        $rootScope.currentUser = null;
        $auth.logout();
      }
		};
	}]);

}
