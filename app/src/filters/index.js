'use strict';
import angular from 'angular';
import currentDayFilter from './currentDayFilter';

const filters = angular.module( 'filters', [] );

currentDayFilter(filters);

export default filters.name;
