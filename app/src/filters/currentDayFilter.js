'use strict';
import moment from 'moment';

export default function( ngModule ) {
  ngModule.filter( 'currentDay', function() {
    return function filter( date ){
      return moment(date).format("dddd, MMMM Do YYYY");
    };
  });
}
