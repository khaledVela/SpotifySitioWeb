import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const FormularioArtista = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [ListaGenero, setListaGenero] = useState([]);
    const [nombre, setNombre] = useState("");
    const [genero, setGenero] = useState("");

    useEffect(() => {
        fetchListaGenero();
        if(id){
            fetchArtistaById();
        }
    },[]);

    const fetchListaGenero = () => {
        axios.get('http://localhost:8080/segParcial/?controller=genero&action=list')
        .then(res => {
            setListaGenero(res.data);
            if(res.data.length > 0){
                setGenero(res.data[0].id)
            }
        }).catch(err => {
            console.log(err);
        });
    }
    const fetchArtistaById = () => {
        axios.get("http://localhost:8080/segParcial/?controller=artista&action=detail&id="+id)
            .then(res => {
                setNombre(res.data.nombre);
                setGenero(res.data.genero);
            }).catch(err => {
                console.log(err);
            });
    }

    const saveArtista = (e) => {
        e.preventDefault();
        const artista={
            "nombre": nombre,
            "genero": genero
        }
        if(id){
            doUpdate(artista);
        }else{
            doCreate(artista);
        }
    }

    const doCreate = (artista) => {
        axios.post("http://localhost:8080/segParcial/?controller=artista&action=store", artista)
            .then(res => {
                navigate("/artista/list");
            }).catch(err => {
                console.log(err);
            });
    }

    const doUpdate = (artista) => {
        axios.put("http://localhost:8080/segParcial/?controller=artista&action=update&id="+id, artista)
            .then(res => {
                navigate("/artista/list");
            }).catch(err => {
                console.log(err);
            });
    }

    const onChangeGenero = (e) => {
        setGenero(e.target.value);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card className='mt-3 mb-3'>
                        <Card.Body>
                            <Card.Title>
                                <h1>Formulario Artista</h1>
                            </Card.Title>
                            <div>
                                <div>
                                    <label>Nombre:</label>
                                    <input className='form-control' type="text"
                                    value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div>
                                    <label>Genero:</label>
                                    <FormSelect onChange={onChangeGenero} value={genero}>
                                        {ListaGenero.map((genero) => (
                                            <option key={genero} value={genero.id}>{genero.nombre}</option>
                                        ))}
                                    </FormSelect>
                                </div>
                                <div>
                                    <Button className='mt-2' variant="primary" onClick={saveArtista}>Guardar</Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default FormularioArtista;