import validateNoWhiteSpace from './form-validations/no-whitespace-validator';
import validatePasswordParams from './form-validations/password-params-validator';

const components = angular.module( 'components', [] );

validateNoWhiteSpace( components );
validatePasswordParams(components);
export default components.name;
