import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const FormularioGenero = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");

    useEffect(() => {
        if(id){
            fetchGeneroById();
        }
    },[]);

    const fetchGeneroById = () => {
        axios.get("http://localhost:8080/segParcial/?controller=genero&action=detail&id="+id)
            .then(res => {
                setNombre(res.data.nombre);
            }).catch(err => {
                console.log(err);
            });
    }

    const saveGenero = (e) => {
        e.preventDefault();
        const genero={
            "nombre": nombre
        }
        if(id){
            doUpdate(genero);
        }else{
            doCreate(genero);
        }
    }

    const doCreate = (genero) => {
        axios.post("http://localhost:8080/segParcial/?controller=genero&action=store", genero)
            .then(res => {
                navigate("/genero/list");
            }).catch(err => {
                console.log(err);
            });
    }

    const doUpdate = (genero) => {
        axios.put("http://localhost:8080/segParcial/?controller=genero&action=update&id="+id, genero)
            .then(res => {
                navigate("/genero/list");
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
                                <h1>Formulario Genero</h1>
                            </Card.Title>
                            <div>
                                <div>
                                    <label>Nombre:</label>
                                    <input className='form-control' type="text"
                                        value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div>
                                    <Button className='mt-2' variant="primary" onClick={saveGenero}>Guardar</Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default FormularioGenero;