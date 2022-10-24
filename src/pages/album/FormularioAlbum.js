import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const FormularioAlbum = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [ListaArtista, setListaArtista] = useState([]);
    const [nombre, setNombre] = useState("");
    const [artista, setArtista] = useState("");

    useEffect(() => {
        fetchListaArtista();
        if(id){
            fetchAlbumById();
        }
    },[]);

    const fetchListaArtista = () => {
        axios.get('http://localhost:8080/segParcial/?controller=artista&action=list')
        .then(res => {
            setListaArtista(res.data);
            if(res.data.length>0){
                setArtista(res.data[0].id)
            }
        }).catch(err => {
            console.log(err);
        });
    }
    const fetchAlbumById = () => {
        axios.get("http://localhost:8080/segParcial/?controller=album&action=detail&id="+id)
            .then(res => {
                setNombre(res.data.nombre);
                setArtista(res.data.artista);
            }).catch(err => {
                console.log(err);
            });
    }

    const saveAlbum = (e) => {
        e.preventDefault();
        const album={
            "nombre": nombre,
            "artista_id": artista
        }
        if(id){
            doUpdate(album);
        }else{
            doCreate(album);
        }
    }

    const doCreate = (album) => {
        axios.post("http://localhost:8080/segParcial/?controller=album&action=store", album)
            .then(res => {
                navigate("/album/list");
            }).catch(err => {
                console.log(err);
            });
    }

    const doUpdate = (album) => {
        axios.put("http://localhost:8080/segParcial/?controller=album&action=update&id="+id, album)
            .then(res => {
                navigate("/album/list");
            }).catch(err => {
                console.log(err);
            });
    }

    const onChangeArtista = (e) => {
        setArtista(e.target.value);
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
                                    <label>Artista:</label>
                                    <FormSelect onChange={onChangeArtista} value={artista}>
                                        {ListaArtista.map((artista) => (
                                            <option key={artista} value={artista.id}>{artista.nombre}</option>
                                        ))}
                                    </FormSelect>
                                </div>
                                <div>
                                    <Button className='mt-2' variant="primary" onClick={saveAlbum}>Guardar</Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default FormularioAlbum;