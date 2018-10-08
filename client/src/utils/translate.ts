const translateMap = {
  character: 'Character',
};

function translate(key: TemplateStringsArray, replace?: string | number): string {
  return `${translateMap[key[0]]}`;
}

translate`character`;
