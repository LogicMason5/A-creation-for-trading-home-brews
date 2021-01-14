import React from 'react'
import { FieldProps, getIn } from 'formik'
import { TextFieldProps, TextField } from '@material-ui/core'

/**
 * Material TextField Component with Formik Support including Errors.
 * Intended to be specified via the `component` prop in a Formik <Field> or <FastField> component.
 * Material-UI specific props are passed through.
 */
export const FormTextField: React.FC<FieldProps & TextFieldProps> = props => {
  const isTouched = getIn(props.form.touched, props.field.name)
  const errorMessage = getIn(props.form.errors, props.field.name)

  const { error, helperText, field, form, ...rest } = props

  return (
    <TextField
      variant="outlined"
      error={error ?? Boolean(isTouched && errorMessage)}
      helperText={helperText ?? ((isTouched && errorMessage) ? errorMessage : undefined)}
      {...rest}
      {...field}
    />
  )
}
