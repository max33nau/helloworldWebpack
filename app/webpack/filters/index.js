'use strict';
import angular from 'angular';
import experienceFilter from './experience-filter';

const filters = angular.module( 'filters', [] );

experienceFilter(filters);

export default filters.name;
