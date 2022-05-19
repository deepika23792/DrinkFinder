import { React } from 'react';
import { Modal } from 'react-bootstrap';
import CarouselImg from "../CarouselImg";
import './style.css'

const ImageModal = (props) => {
    const images = props.images
    return (
        <div className='modalsImg'>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='alterSize'
            >
                <Modal.Header closeButton>
                    <h4> {props.name}</h4>
                </Modal.Header>
                <Modal.Body>
                    <CarouselImg drinksImages={images} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ImageModal