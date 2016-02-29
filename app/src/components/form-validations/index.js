'use strict';
import validateNoWhiteSpace from './no-whitespace-validator';
import validatePasswordParams from './password-params-validator';

export default function( ngModule ) {
  validateNoWhiteSpace( ngModule );
  validatePasswordParams(ngModule);
}
