import { observable } from 'mobx';

type reactionValue = string | [string, (change: string) => string];
type IReactionGroup = {
  [item: string]: reactionValue;
};
type IReactionObject = {
  [key: string]: {
    value: string,
    valid: boolean,
    touched: boolean,
  };
};

function seperateValue(value: reactionValue) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function formGroup<T extends IReactionGroup>(group: T) {
  const builder: IReactionObject = {};

  Object.keys(group).forEach((key) => {
    builder[key] = {
      value: seperateValue(group[key]),
      valid: true,
      touched: false,
    };
  });

  const state = observable(builder);

  return {
    observer: state,
    pull: (key: string) => state[key].value,
    push: (key: string, value: any) => state[key].value = value,
    currentState: () => {
      let builder = {};

      observable.map(state).forEach((value, key) => {
        builder[key] = value.value;
      });

      return builder as T;
    },
    validateAll: () => {
      const values = observable.map(state).values();

      console.log(values);
    },
  };
}

export default formGroup;
