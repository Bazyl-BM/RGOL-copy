import type { FieldProps } from 'formik';
import { ErrorMessage } from 'formik';
import type { FC } from 'react';
import React from 'react';
import styled from 'styled-components';

import { Checkbox } from '../Newsletter/Newsletter.style';

export const ErrorLabel = styled.div`
  font-size: 1.2rem;
  font-weight: unset;
  color: #e72b37;
`;

interface CustomInputProps {
  type?: string;
  label: string;
  disabled?: boolean;
}
export const CustomChecbox: FC<CustomInputProps & FieldProps> = ({
  field, // { name, value, onChange, onBlur }
  label,
  // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
}) => (
  <>
    <Checkbox>
      <div>
        <input type="checkbox" {...field} id={field.name} />
        <label htmlFor={field.name}>
          <p>{label}</p>
        </label>
      </div>
      <ErrorMessage name={field.name}>
        {(msg) => <ErrorLabel>{msg}</ErrorLabel>}
      </ErrorMessage>
    </Checkbox>
  </>
);
