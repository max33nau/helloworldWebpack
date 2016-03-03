'use strict';
import angular from 'angular';
import userFactory from './user-factory';
import playerFactory from './player-info-factory';

const services = angular.module( 'services', [] );

userFactory(services);
playerFactory(services);

export default services.name;
