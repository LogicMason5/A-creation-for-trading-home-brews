/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { FieldProps, getIn } from 'formik';
import { TextFieldProps, TextField } from '@material-ui/core';

// eslint-disable-next-line max-len
const FormTextField: React.FC<FieldProps & TextFieldProps & { initHelperText: string }> = (props) => {
  const isTouched = getIn(props.form.touched, props.field.name);
  const errorMessage = getIn(props.form.errors, props.field.name);

  const {
    error, helperText, field, initHelperText, ...rest
  } = props;

  return (
    <TextField
      variant="outlined"
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={helperText ?? ((isTouched && errorMessage) ? errorMessage : initHelperText)}
      {...rest}
      {...field}
    />
  );
};

export default FormTextField;
