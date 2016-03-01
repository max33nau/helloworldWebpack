'use strict';
import template from './weeklyTasks.html';

export default {
  url: '/weeklyTasks',
  data: {
    requireLogin: true // remember this applies to all the children so only need it at top level
  },
  template
};
