import { observable, intercept } from 'mobx';

type IFormValue = string | number;
type IFormControl = (value: IFormValue, validators?: any[]) => IFormControlGroup;
interface IFormControlGroup {
  value: IFormValue;
  valid: boolean;
  touched: boolean;
  validators: ((value: IFormValue) => boolean)[];
}
interface IFormGroupBuilder {
  [item: string]: IFormValue | IFormControlGroup;
}

function formControl(defaultValue: IFormValue, ...validators: any[]): IFormControlGroup {
  return {
    value: defaultValue === null ? '' : defaultValue,
    valid: false,
    touched: false,
    validators: [...validators],
  };
}

function formGroup<T extends IFormGroupBuilder>(group: T) {
  const builder: any = {}; // TODO: add interface to this

  for (const key in group) {
    const value = group[key];

    if (typeof value !== 'string' && typeof value !== 'number') {
      builder[key] = value;
    } else {
      builder[key] = formControl(value);
    }
  }

  const state = observable(builder);

  const form = {
    stateValueIsValid: (key: string, value: any): boolean => {
      const stateTarget = state[key];

      const validators = stateTarget.validators;

      if (validators.length === 0) return true;

      const isValid = validators.every((validator) => validator(value));

      if (!isValid) {
        return false;
      }

      return true;
    },
    pull: (key: string) => state[key].value,
    push: (key: string, value: any) => {
      state[key].value = value;

      state[key].valid = form.stateValueIsValid(key, value);
    },
    currentState: () => {
      let builder = {};

      observable.map(state).forEach((value, key) => {
        builder[key] = value.value;
      });

      return builder as T;
    },
    isValid: () => {
      const currentState = form.currentState();

      const isValid = Object.entries(currentState).every((entry) => form.stateValueIsValid(entry[0], entry[1]));

      return isValid;
    },
  };

  return form;
}

export {
  formControl,
};

export default formGroup;
