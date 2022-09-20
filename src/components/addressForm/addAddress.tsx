import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import type { FC } from 'react';
import React from 'react';
import type { Id } from 'react-toastify';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { useAppDispatch } from '@/redux/hooks';
import { createTutorial, updateTutorial } from '@/redux/Slice/addressSlide';

import { CustomField } from '../Formik/FIeld';
import { ModalBodyWrapper, ModalFooter, ModalHeader } from '../Modal/Modal';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Pole Imię jest wymagane'),
  surname: Yup.string().required('Pole Nazwisko jest wymagane'),
  street: Yup.string().required('Pole Ulica jest wymagane'),
  buldingNumber: Yup.string().required('Pole Numer Budynku jest wymagane'),
  city: Yup.string().required('Pole Miasto jest wymagane'),
  postCode: Yup.string().required('Pole Kod Pocztowy jest wymagane'),
  phoneNumber: Yup.string().required('Pole Telefon jest wymagane'),
});

const AddAddressForm: FC<Props> = ({ initalValue, setModalIsOpen }) => {
  interface Values {
    companyName: string;
    Nip: string;
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
                  firstName: initalValue.firstName,
                  surname: initalValue.surname,
                  companyName: initalValue.companyName,
                  street: initalValue.street,
                  buldingNumber: initalValue.buldingNumber,
                  flatNumber: initalValue.flatNumber,
                  city: initalValue.city,
                  postCode: initalValue.postCode,
                  phoneNumber: initalValue.phoneNumber,
                }
              : {
                  firstName: '',
                  surname: '',
                  companyName: '',
                  street: '',
                  buldingNumber: '',
                  flatNumber: '',
                  city: '',
                  postCode: '',
                  phoneNumber: '',
                }
          }
          validationSchema={SignupSchema}
          onSubmit={(
            values: Values,
            { setSubmitting, resetForm }: FormikHelpers<Values>
          ) => {
            if (initalValue) {
              dispatch(
                updateTutorial({
                  ...values,
                  email: session!.user!.email,
                  idItem: initalValue.idItem,
                  isDefault: initalValue.isDefault,
                })
              )
                .then((response) => {
                  if (response.meta.requestStatus === 'fulfilled') {
                    toastId.current = toast.success(
                      'Adres został zaktualizowany',
                      {
                        position: 'top-center',
                        hideProgressBar: true,
                      }
                    );
                  }
                })

                .catch((e) => console.error(e))
                .finally(() => {
                  setSubmitting(false);
                  resetForm();
                });
            } else {
              dispatch(
                createTutorial({ ...values, email: session!.user!.email })
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
                name="firstName"
                label="Imię"
                inputType="input"
                component={CustomField}
              />
              <Field
                type="text"
                name="surname"
                label="Nazwisko"
                inputType="input"
                component={CustomField}
              />
              <Field
                type="text"
                name="companyName"
                label="Firma"
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
              <Field
                type="text"
                name="phoneNumber"
                label="Telefon"
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
export default AddAddressForm;
