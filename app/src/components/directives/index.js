'use strict';

import mainNav from './main-nav/mainNav';
import myNavLink from './my-nav-link/myNavLink';

export default function( ngModule ) {
  mainNav( ngModule );
  myNavLink( ngModule );
}
