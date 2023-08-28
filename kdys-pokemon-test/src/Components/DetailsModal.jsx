import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DetailsModal({ isShow, url, handleModal }) {

    const [pokemonDetails, setpokemonDetails] = useState('')
    const getDetails = async () => {
        axios.get(url)
            .then((res) => {
                if (res.status === 200) {
                    setpokemonDetails(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        if (isShow) {
            getDetails()
        }
    }, [isShow, url])
    console.log(pokemonDetails, 'pokemondetails')

    const [show, setShow] = useState(isShow);

    const handleClose = () => {
        handleModal(false)
        setShow(false)
    };
    const handleShow = () => {
        handleModal(true)
        setShow(true)
    };
    useEffect(() => {
        if (isShow) {

            handleShow()
        }
        else {
            handleModal(false)
            handleClose()
        }
    }, [isShow])

    return (
        <>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Pokemon Details</Modal.Title>
                </Modal.Header>



                <Modal.Body>

                    <h4>Name</h4>
                    <h5>{pokemonDetails.name}</h5>
                    <br />
                    <h4>Pokemon Type</h4>
                    <ul>
                        {pokemonDetails?.types?.map((type, index) => (
                            <li key={index}>{type.type.name}</li>
                        ))}
                    </ul>
                    <br />
                    <h4>height</h4>
                    <h5>{pokemonDetails?.height}</h5>
                    <br />
                    <h4>Attacks</h4>
                    <h5>{pokemonDetails?.moves?.length}</h5>

                </Modal.Body>




                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DetailsModal;