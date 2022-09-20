import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React from 'react';
import type { Id } from 'react-toastify';
import { toast } from 'react-toastify';

import { useAppDispatch } from '@/redux/hooks';
import {
  createCupboardsBox,
  updateCupboardsBox,
} from '@/redux/Slice/cupboardsBox';

import { CustomField } from '../Formik/FIeld';
import { ModalBodyWrapper, ModalFooter, ModalHeader } from '../Modal/Modal';

const AddCupboardsForm = ({ initalValue, setModalIsOpen }) => {
  const { data: session } = useSession();
  const toastId = React.useRef<Id>();
  const dispatch = useAppDispatch();
  return (
    <>
      <ModalHeader>
        <h5>SCHOWEK</h5>
        <button
          type="button"
          aria-label="Close"
          onClick={() => setModalIsOpen({ isOpen: false })}
        >
          ×
        </button>
      </ModalHeader>
      <ModalBodyWrapper>
        <Formik
          initialValues={
            initalValue
              ? {
                  cupboardsBoxName: initalValue.cupboardsBoxName,
                }
              : {
                  cupboardsBoxName: '',
                }
          }
          onSubmit={(
            values: Values,
            { setSubmitting, resetForm }: FormikHelpers<Values>
          ) => {
            if (initalValue) {
              dispatch(
                updateCupboardsBox({
                  cupboardsBoxName: values.cupboardsBoxName,
                  email: session!.user!.email,
                  idItem: initalValue.idBox,
                })
              )
                .then((response) => {
                  if (response.meta.requestStatus === 'fulfilled') {
                    toastId.current = toast.success('Adres został zapisany', {
                      position: 'top-center',
                      hideProgressBar: true,
                    });
                  }
                })
                .catch((e) => console.error(e))
                .finally(() => {
                  setSubmitting(false);
                  resetForm();
                });
            } else {
              dispatch(
                createCupboardsBox({
                  cupboardsBoxName: values.cupboardsBoxName,
                  email: session!.user!.email,
                })
              )
                .then((response) => {
                  if (response.meta.requestStatus === 'fulfilled') {
                    toastId.current = toast.success('Adres został zapisany', {
                      position: 'top-center',
                      hideProgressBar: true,
                    });
                  }
                })
                .catch((e) => console.error(e))
                .finally(() => {
                  setSubmitting(false);
                  resetForm();
                });
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="text"
                name="cupboardsBoxName"
                label="Nazwa"
                inputType="input"
                component={CustomField}
              />

              <ModalFooter>
                <button onClick={() => setModalIsOpen({ isOpen: false })}>
                  Anuluj
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  onClick={() => setModalIsOpen({ isOpen: false })}
                >
                  Zapisz
                </button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalBodyWrapper>
    </>
  );
};
export default AddCupboardsForm;
