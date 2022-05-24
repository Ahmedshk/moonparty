import React from 'react'
import { Modal } from 'react-bootstrap'
import {IoIosClose} from "react-icons/io"
import './Modal.scss'

export interface IModalInfo {
  show: boolean;
  handleClose: () => void;
  children: JSX.Element | JSX.Element[];
  size: string;

}

const ModalData: React.FC<IModalInfo> = ({ show, handleClose, children }) => {
  return (
    <Modal dialogClassName='modal_info' size={'lg'} show={show} onHide={handleClose}>
      <Modal.Body>
        <div className="d-flex justify-content-end">
          <span onClick={() => handleClose()}>
            <IoIosClose className='cross'/>
          </span>
        </div>
        {children}
      </Modal.Body>
    </Modal>
  )
}

export default ModalData