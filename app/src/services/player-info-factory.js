'use strict';
export default function( ngModule ) {
	ngModule.provider( 'PlayerInfo',  function(){
		var API_URL;
		this.setUrl = function(url) {
			API_URL = url;
		};
		this.$get = function( $http,$cacheFactory ) {
    var playerCache = $cacheFactory('player');
    return {
      getAll(){
        return $http({
          url: API_URL + '/players',
          method: 'GET',
          cache: playerCache
        });
      },
      createNewPlayer(newPlayer) {
        return  $http({
          url: API_URL+'/players',
          method: 'POST',
          data: newPlayer
        });
      },
      update(updatedPlayer) {
        return $http({
          url: API_URL+'/players/'+updatedPlayer._id,
          method: 'PUT',
          data: updatedPlayer
        });
      },
      delete(player) {
        return $http({
          url: API_URL+'/players/'+player._id,
          method: 'DELETE'
        });
      },
      removeCache() {
        return playerCache.removeAll();
      },
      updateCache(updateCachePlayer) {
        var cachedUrl = API_URL+'/players';
        var cachedPlayers = JSON.parse(playerCache.get(cachedUrl)[1]);
        var index = cachedPlayers.findIndex(function(player) {
          return player._id === updateCachePlayer._id;
        });
        cachedPlayers[index] = updateCachePlayer;
        playerCache.put(cachedUrl, cachedPlayers);
      }
		};
	};
});
}
