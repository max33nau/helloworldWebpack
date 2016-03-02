'use strict';
import template from './admin.html';

export default {
  url: '/admin',
  data: {
    requireLogin: true
  },
  template,
};
