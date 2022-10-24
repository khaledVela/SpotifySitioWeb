import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
const Canciones= ()=>{
    const {id}= useParams();
    const navigate = useNavigate();
    const [imagen, setImagen] = useState(null);
    const uploadPhoto = () => {
        const formData = new FormData();
        formData.append("imagen", imagen);
        axios.post("http://localhost:8080/segParcial/?controller=cancion&action=photo&id="+id, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                    navigate("/cancion/list");
            }).catch(err => {
                console.log(err);
            });
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Card className='mt-3 mb-3'>
                        <Card.Body>
                            <Card.Title>
                                <h1>Cancion</h1>
                            </Card.Title>
                            <div>
                                <label>Archivo mp3</label>
                                <input accept=".mp3" type="file" className="form-control" onChange={(e) => setImagen(e.target.files[0])} />
                            </div>
                            <div>
                                <Button className="mt-2" onClick={uploadPhoto}>Subir</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
export default Canciones;