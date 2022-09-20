import type { FieldProps } from 'formik';
import { ErrorMessage } from 'formik';
import type { FC } from 'react';
import React from 'react';
import { Rating } from 'react-simple-star-rating';
import styled from 'styled-components';

import {
  FormField,
  FormFieldInput,
  FormFieldLabel,
} from '../AccordianProduct/AskForm';

export const ErrorLabel = styled.div`
  font-size: 1.2rem;
  font-weight: unset;
  color: #e72b37;
`;
export const Textarea = styled.textarea`
  border-width: 0;
  border-color: #e0e0e0;
  padding: 0.8rem 1.6rem;
  box-shadow: none;
  outline: none;
  height: auto;
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 1.5;
  color: #495057;
  background-color: #e0e0e0;
  background-clip: padding-box;
  border: 1px solid #e0e0e0;
  border-radius: 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  display: block;
  width: 100%;
  overflow: auto;
  resize: vertical;
`;

interface CustomInputProps {
  type?: string;
  inputType: 'input' | 'checkbox' | 'textArea' | 'rating' | 'fileInput';
  label: string;
  disabled?: boolean;
  maxLength?: number;
}
export const CustomField: FC<CustomInputProps & FieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { setFieldValue },
  inputType,
  // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,

  maxLength,
  disabled,
  ...props
}) => (
  <FormField>
    {inputType === 'textArea' && (
      <>
        <Textarea {...field} />
        <div>
          Pozostało znaków: {maxLength && maxLength - field.value.length}
        </div>
      </>
    )}
    {inputType === 'input' && (
      <FormFieldInput
        disabled={disabled}
        notFocus={(field.value && field.value.length !== 0) || disabled}
        {...field}
        {...props}
      />
    )}

    {inputType === 'rating' && (
      <div>
        <Rating
          ratingValue={0}
          {...field}
          size={24.5}
          fillColor="#86c042"
          onClick={(value: number) => setFieldValue(field.name, value / 20)}
        />
        <span style={{ margin: ' 7px 0 0 7px' }}>{field.value}</span>
      </div>
    )}
    {inputType === 'fileInput' && (
      <div style={{ marginTop: '10px' }}>
        <input
          {...field}
          {...props}
          onChange={(event) => {
            const { files } = event.target;
            const myFiles = Array.from(files);
            setFieldValue('images', myFiles, false);
          }}
        />
      </div>
    )}
    <FormFieldLabel>
      <span>*</span>
      {label}
    </FormFieldLabel>
    <ErrorMessage name={field.name}>
      {(msg) => <ErrorLabel>{msg}</ErrorLabel>}
    </ErrorMessage>
  </FormField>
);
