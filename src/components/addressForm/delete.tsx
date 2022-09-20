import { useSession } from 'next-auth/react';
import React from 'react';
import type { Id } from 'react-toastify';
import * as Yup from 'yup';

import { useAppDispatch } from '@/redux/hooks';
import { deleteTutorial } from '@/redux/Slice/addressSlide';

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
const RemoveAddressForm = ({ idItem, setModalIsOpen }) => {
  const { data: session } = useSession();
  const toastId = React.useRef<Id>();
  const dispatch = useAppDispatch();
  return (
    <>
      <ModalHeader>
        <h5>USUWANIE ADRESU</h5>
        <button
          type="button"
          aria-label="Close"
          onClick={() => setModalIsOpen({ isOpen: false })}
        >
          ×
        </button>
      </ModalHeader>
      <ModalBodyWrapper>Czy na pewno usunąć ten adres?</ModalBodyWrapper>
      <ModalFooter>
        <button onClick={() => setModalIsOpen({ isOpen: false })}>
          Anuluj
        </button>
        <button
          type="submit"
          onClick={() => {
            dispatch(deleteTutorial({ idItem, email: session!.user!.email }));
            setModalIsOpen({ isOpen: false });
          }}
        >
          Usuń
        </button>
      </ModalFooter>
    </>
  );
};
export default RemoveAddressForm;
