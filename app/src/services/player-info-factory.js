'use strict';
export default function( ngModule ) {
	ngModule.factory( 'PlayerInfo',  [ '$http', 'baseUrl', function( $http, baseUrl ) {
		return {
      getAll(){
        return $http({
          url: baseUrl + '/players',
          method: 'GET',
        });
      },
      createNewPlayer(newPlayer) {
        return  $http({
          url: baseUrl+'/players',
          method: 'POST',
          data: newPlayer
        });
      },
      update(updatedPlayer) {
        return $http({
          url: baseUrl+'/players/'+updatedPlayer._id,
          method: 'PUT',
          data: updatedPlayer
        });
      },
      delete(player) {
        return $http({
          url: baseUrl+'/players/'+player._id,
          method: 'DELETE'
        });
      }
		};
	}]);

}
