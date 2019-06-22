import React from 'react';
import { FieldRenderProps } from 'react-final-form';

interface Props extends FieldRenderProps<string, any> {
  spanClassName?: string;
}

export const TextInput = ({ input, meta, ...rest }: Props) => {
  return (
    <div>
      <input type="text" {...input} {...rest} />
      {meta.error && meta.touched && (
        <span className={rest.spanClassName}>{meta.error}</span>
      )}
    </div>
  );
};
