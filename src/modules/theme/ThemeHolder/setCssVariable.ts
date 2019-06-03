import CssVariable from './CssVariable';

const setCssVariable = (variable: CssVariable) => `--${variable.hash}: ${variable.styling};`;

export default setCssVariable;
