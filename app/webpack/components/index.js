import validateUniqueUsername from './form-validations/validate-unique-username';

const components = angular.module( 'components', [] );

validateUniqueUsername( components );
export default components.name;
