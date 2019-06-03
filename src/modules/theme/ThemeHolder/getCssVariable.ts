import CssVariable from './CssVariable';

const getCssVariable = (variable: CssVariable) => `--${variable.hash}`;

export default getCssVariable;
