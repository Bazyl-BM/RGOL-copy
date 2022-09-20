import { useSession } from 'next-auth/react';
import React from 'react';
import type { Id } from 'react-toastify';

import { useAppDispatch } from '@/redux/hooks';
import { deleteCupboardsBox } from '@/redux/Slice/cupboardsBox';

import { ModalBodyWrapper, ModalFooter, ModalHeader } from '../Modal/Modal';

const RemoveCupboardsForm = ({ idItem, setModalIsOpen }) => {
  const { data: session } = useSession();
  const toastId = React.useRef<Id>();
  const dispatch = useAppDispatch();
  return (
    <>
      <ModalHeader>
        <h5>Schowek</h5>
        <button
          type="button"
          aria-label="Close"
          onClick={() => setModalIsOpen({ isOpen: false })}
        >
          ×
        </button>
      </ModalHeader>
      <ModalBodyWrapper>Usuń</ModalBodyWrapper>
      <ModalFooter>
        <button onClick={() => setModalIsOpen({ isOpen: false })}>
          Anuluj
        </button>
        <button
          type="submit"
          onClick={() => {
            dispatch(
              deleteCupboardsBox({ idItem, email: session!.user!.email })
            );
            setModalIsOpen({ isOpen: false });
          }}
        >
          Usuń
        </button>
      </ModalFooter>
    </>
  );
};
export default RemoveCupboardsForm;
