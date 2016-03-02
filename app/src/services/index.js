'use strict';
import angular from 'angular';
import userFactory from './user-factory';

const services = angular.module( 'services', [] );

userFactory(services);

export default services.name;
