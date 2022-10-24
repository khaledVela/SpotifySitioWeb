import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, FormSelect, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const FormularioCancion = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [ListaAlbum, setListaAlbum] = useState([]);
    const [nombre, setNombre] = useState("");
    const [album, setAlbum] = useState("");

    useEffect(() => {
        fetchListaAlbum();
        if(id){
            fetchCancionById();
        }
    },[]);

    const fetchListaAlbum = () => {
        axios.get('http://localhost:8080/segParcial/?controller=album&action=list')
        .then(res => {
            setListaAlbum(res.data);
            if(res.data.length>0){
                setAlbum(res.data[0].id)
            }
        }).catch(err => {
            console.log(err);
        });
    }
    const fetchCancionById = () => {
        axios.get("http://localhost:8080/segParcial/?controller=cancion&action=detail&id="+id)
            .then(res => {
                setNombre(res.data.nombre);
                setAlbum(res.data.album);
            }).catch(err => {
                console.log(err);
            });
    }

    const saveCancion = (e) => {
        e.preventDefault();
        const cancion={
            "nombre": nombre,
            "album_id": album
        }
        if(id){
            doUpdate(cancion);
        }else{
            doCreate(cancion);
        }
    }

    const doCreate = (cancion) => {
        axios.post("http://localhost:8080/segParcial/?controller=cancion&action=store", cancion)
            .then(res => {
                navigate("/cancion/list");
            }).catch(err => {
                console.log(err);
            });
    }

    const doUpdate = (cancion) => {
        axios.put("http://localhost:8080/segParcial/?controller=cancion&action=update&id="+id, cancion)
            .then(res => {
                navigate("/cancion/list");
            }).catch(err => {
                console.log(err);
            });
    }

    const onChangeAlbum = (e) => {
        setAlbum(e.target.value);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card className='mt-3 mb-3'>
                        <Card.Body>
                            <Card.Title>
                                <h1>Formulario Cancion</h1>
                            </Card.Title>
                            <div>
                                <div>
                                    <label>Nombre:</label>
                                    <input className='form-control' type="text"
                                    value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                </div>
                                <div>
                                    <label>Artista:</label>
                                    <FormSelect onChange={onChangeAlbum} value={album}>
                                        {ListaAlbum.map((album) => (
                                            <option key={album} value={album.id}>{album.nombre}</option>
                                        ))}
                                    </FormSelect>
                                </div>
                                <div>
                                    <Button className='mt-2' variant="primary" onClick={saveCancion}>Guardar</Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default FormularioCancion;