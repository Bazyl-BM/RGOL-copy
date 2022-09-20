import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React from 'react';
import type { Id } from 'react-toastify';
import { toast } from 'react-toastify';

import { useAppDispatch } from '@/redux/hooks';
import { createInvoke, updateInvoke } from '@/redux/Slice/invokeSlide';

import { CustomField } from '../Formik/FIeld';
import { ModalBodyWrapper, ModalFooter, ModalHeader } from '../Modal/Modal';

const AddInvokeForm = ({ initalValue, setModalIsOpen }) => {
  interface Values {
    companyName: string;
    NIP: string;
    street: string;
    buldingNumber: string;
    flatNumber: string;
    city: string;
    postCode: string;
    phoneNumber: string;
  }
  const { data: session } = useSession();
  const toastId = React.useRef<Id>();
  const dispatch = useAppDispatch();
  return (
    <>
      <ModalHeader>
        <h5>EDYCJA ADRESÓW</h5>
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
                  companyName: initalValue.companyName,
                  NIP: initalValue.NIP,
                  street: initalValue.street,
                  buldingNumber: initalValue.buldingNumber,
                  flatNumber: initalValue.flatNumber,
                  city: initalValue.city,
                  postCode: initalValue.postCode,
                  phoneNumber: initalValue.phoneNumber,
                }
              : {
                  companyName: '',
                  NIP: '',
                  street: '',
                  buldingNumber: '',
                  flatNumber: '',
                  city: '',
                  postCode: '',
                  phoneNumber: '',
                }
          }
          onSubmit={(
            values: Values,
            { setSubmitting, resetForm }: FormikHelpers<Values>
          ) => {
            if (initalValue) {
              dispatch(
                updateInvoke({
                  ...values,
                  email: session!.user!.email,
                  idItem: initalValue.idItem,
                  isDefault: initalValue.isDefault,
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
              dispatch(createInvoke({ ...values, email: session!.user!.email }))
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
                name="companyName"
                label="Nazwa Firmy"
                inputType="input"
                component={CustomField}
              />
              <Field
                type="text"
                name="NIP"
                label="Nip"
                inputType="input"
                component={CustomField}
              />
              <Field
                type="text"
                name="street"
                label="Ulica"
                inputType="input"
                component={CustomField}
              />
              <Field
                type="text"
                name="buldingNumber"
                label="Numer Budynku"
                inputType="input"
                component={CustomField}
              />
              <Field
                type="text"
                name="flatNumber"
                label="Numer Lokalu"
                inputType="input"
                component={CustomField}
              />
              <Field
                type="text"
                name="city"
                label="Miasto"
                inputType="input"
                component={CustomField}
              />
              <Field
                type="text"
                name="postCode"
                label="Kod Pocztowy"
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
export default AddInvokeForm;
