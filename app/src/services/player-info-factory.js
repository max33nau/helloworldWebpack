'use strict';
export default function( ngModule ) {
	ngModule.factory( 'PlayerInfo',  [ '$http', 'baseUrl','$cacheFactory', function( $http, baseUrl, $cacheFactory ) {
    var playerCache = $cacheFactory('player');

    return {
      getAll(){
        return $http({
          url: baseUrl + '/players',
          method: 'GET',
          cache: playerCache
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
      },
      removeCache() {
        return playerCache.removeAll();
      },
      updateCache(updateCachePlayer) {
        var cachedUrl = baseUrl+'/players';
        var cachedPlayers = JSON.parse(playerCache.get(cachedUrl)[1]);
        var index = cachedPlayers.findIndex(function(player) {
          return player._id === updateCachePlayer._id;
        });
        cachedPlayers[index] = updateCachePlayer;
        playerCache.put(cachedUrl, cachedPlayers);
      }
		};
	}]);

}
