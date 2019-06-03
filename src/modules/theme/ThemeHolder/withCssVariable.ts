import CssVariable from './CssVariable';
import getCssVariable from './getCssVariable';

const withCssVariable = (variable: CssVariable) => `var(${getCssVariable(variable)})`;

export default withCssVariable;
