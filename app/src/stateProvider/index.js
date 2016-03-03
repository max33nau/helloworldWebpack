'use strict';

/* StateProvider Congifs */
import homeState from './home/home';
import playerSearchState from './playerSearch/playerSearch';
import playerSearchShowAll from './playerSearch/showAll/showAll';
import playerSearchShowOne from './playerSearch/showOne/showOne';
import adminState from './admin/admin';


export default function($stateProvider) {
  $stateProvider
    .state('mainPage', homeState )
    .state('searchPlayer',playerSearchState)
    .state('searchPlayer.showAll', playerSearchShowAll)
    .state('searchPlayer.showOne', playerSearchShowOne)
    .state('admin', adminState);
}
