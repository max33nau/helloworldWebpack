'use strict';
export default function( ngModule ) {
  ngModule.filter( 'experience', function() {
    return function filter( yearsInTheLeauge ){
      if ( yearsInTheLeauge === 0 ) {
        return 'Just starting off but looking for big things';
      } else if( yearsInTheLeauge < 5) {
        return 'Not his first rodeo but still has a lot to learn';
      } else if( yearsInTheLeauge < 10) {
        return 'This guy is in his prime and has been doing this a while';
      } else if ( yearsInTheLeauge >= 10) {
        return 'Learn from this guy, he is a full out veteran and knows how to be successful';
      } else {
        return 'Not Provided';
      }
    };
  });
}
