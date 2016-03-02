'use strict';

import mainNav from './main-nav/mainNav';
import myNavLink from './my-nav-link/myNavLink';
import logout from './logout/logout';


export default function( ngModule ) {
  mainNav( ngModule );
  myNavLink( ngModule );
  logout(ngModule);
}
