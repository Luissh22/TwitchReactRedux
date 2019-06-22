import React from 'react';
import { FieldRenderProps } from 'react-final-form';

type Props = FieldRenderProps<boolean, any>;

export const CheckboxInput: React.FC<Props> = ({
  input: { value, ...input }
}: Props) => <input {...input} type="checkbox" checked={!!value} />;
