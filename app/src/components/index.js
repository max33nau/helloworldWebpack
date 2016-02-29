'use strict';

import formValidation from './form-validations';
import directives from './directives';

const components = angular.module( 'components', [] );

formValidation(components);
directives(components);

export default components.name;
