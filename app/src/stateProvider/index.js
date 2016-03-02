'use strict';

/* StateProvider Congifs */
import homeState from './home/home';
import playerSearchState from './playerSearch/playerSearch';
import playerSearchPlayerState from './playerSearch/player/player';
import adminState from './admin/admin';


export default function($stateProvider) {
  $stateProvider
    .state('mainPage', homeState )
    .state('searchPlayer',playerSearchState)
    .state('searchPlayer.player', playerSearchPlayerState)
    .state('admin', adminState);
}
