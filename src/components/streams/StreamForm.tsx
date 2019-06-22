import React from 'react';
import { Form, Field, FormRenderProps } from 'react-final-form';
import { TextInput } from '../forms';
import { StreamFormValues } from '../../models';

interface StreamFormProps {
  onSubmit: (values: StreamFormValues) => void;
  initialValues?: StreamFormValues;
}
export class StreamForm extends React.Component<StreamFormProps> {
  required = (value: string): string => (value ? undefined : 'Required');
  render() {
    return (
      <Form
        onSubmit={this.props.onSubmit}
        initialValues={this.props.initialValues}
        render={(formRenderProps: FormRenderProps) => (
          <form
            className="ui form error"
            onSubmit={formRenderProps.handleSubmit}
          >
            <div className="field">
              <label>Enter Title</label>
              <Field<string>
                name="title"
                placeholder="Title"
                component={TextInput}
                validate={this.required}
              />
            </div>
            <div className="field">
              <label>Enter Description</label>
              <Field<string>
                name="description"
                placeholder="Description"
                component={TextInput}
                validate={this.required}
              />
            </div>
            <button className="ui button primary">Submit</button>
          </form>
        )}
      />
    );
  }
}
