const styleElement = document.createElement('style');
styleElement.type = 'text/css';
(document.querySelector('head') as HTMLHeadElement).appendChild(styleElement);

const setStyle = (newStyles: string) => styleElement.innerHTML = newStyles;

export default setStyle;
