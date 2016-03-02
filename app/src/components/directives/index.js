'use strict';

import mainNav from './main-nav/mainNav';
import myNavLink from './my-nav-link/myNavLink';
import logout from './logout/logout';
import newPlayer from './newPlayer/newPlayer';
import newPlayerInput from './newPlayer/newPlayerInput/newPlayerInput';
import editExistingPlayers from './editExistingPlayers/editExistingPlayers';
import playerInfo from './editExistingPlayers/playerInfo/playerInfo';
import editPlayer from './editExistingPlayers/playerInfo/editPlayer/editPlayer';
import playerLabel from './editExistingPlayers/playerInfo/playerLabel/playerLabel';


export default function( ngModule ) {
  mainNav( ngModule );
  myNavLink( ngModule );
  logout(ngModule);
  newPlayer(ngModule);
  newPlayerInput(ngModule);
  editExistingPlayers(ngModule);
  playerInfo(ngModule);
  playerLabel(ngModule);
  editPlayer(ngModule);

}
