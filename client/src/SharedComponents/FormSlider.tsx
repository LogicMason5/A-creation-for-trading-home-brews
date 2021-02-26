import * as React from 'react';
import MuiSlider, { SliderProps as MuiSliderProps } from '@material-ui/core/Slider';
import { FieldProps } from 'formik';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface SliderProps extends FieldProps, Omit<MuiSliderProps, 'name' | 'onChange' | 'value' | 'defaultValue'> {}

export const fieldToSlider = ({
  field,
  form: { isSubmitting },
  disabled = false,
  ...props
}: SliderProps): MuiSliderProps => ({
  disabled: isSubmitting || disabled,
  ...props,
  ...field,
  name: field.name,
  value: field.value as number,
});

const FormSlider: React.ComponentType<SliderProps> = (props: SliderProps) => (
  <MuiSlider
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...fieldToSlider(props)}
    onChange={(e, value) => props.form.setFieldValue(props.field.name, value)}
    onBlur={() => props.form.setFieldTouched(props.field.name, true)}
  />
);

export default FormSlider;
