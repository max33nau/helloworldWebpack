'use strict';

import mainController from './main-controller';
import adminController from './admin-controller';
import loginController from './login-controller';
import playerController from './player-controller';
import registerController from './register-controller';

export default function(ngModule) {
  mainController(ngModule);
  adminController(ngModule);
  loginController(ngModule);
  playerController(ngModule);
  registerController(ngModule);
}
