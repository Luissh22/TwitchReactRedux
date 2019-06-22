import React from 'react';
import { FieldRenderProps } from 'react-final-form';

export function RadioInput<T extends string>({
  input,
  meta,
  ...rest
}: FieldRenderProps<T, any>) {
  return <input type="radio" {...input} {...rest} />;
}
