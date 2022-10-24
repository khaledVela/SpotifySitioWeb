import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListaCancion = () => {

    const [cancionList, setCancionList] = useState([]);
    const [albumList, setAlbumList] = useState([]);
    useEffect(() => {
        fetchCancion();
        fetchAlbum();
    },[])

    const fetchCancion = () => {
        axios.get("http://localhost:8080/segParcial/?controller=cancion&action=list")
            .then(res => {
                setCancionList(res.data);
            }).catch(err => {
                console.log(err);
            });
    }

    const fetchAlbum = () => {
        axios.get("http://localhost:8080/segParcial/?controller=album&action=list")
            .then(res => {
                setAlbumList(res.data);
            }).catch(err => {
                console.log(err);
            });
    }

    const eliminarCancion = (cancion) => {
        if(!window.confirm("¿Está seguro que desea eliminar el album "+cancion.nombre+"?")){
            return;
        }
        axios.delete("http://localhost:8080/segParcial/?controller=cancion&action=delete&id="+cancion.id)
            .then(res => {
                fetchCancion();
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
                                <h1>Lista de Cancion</h1>
                            </Card.Title>
                            <div>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Album</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cancionList.map((cancion) => {
                                            return (
                                                <tr key={cancion.id}>
                                                    <td>{cancion.nombre}</td>
                                                    <td>
                                                        {albumList.map((album) => {
                                                            if(album.id == cancion.album){
                                                                return album.nombre;
                                                            }
                                                        })}
                                                    </td>
                                                    <td>
                                                        <audio controls>
                                                            <source src={"http://localhost:8080/segParcial/img/cancion/"+cancion.id +".mp3"} alt={cancion.nombre} width="100" height="100"/>
                                                        </audio>
                                                    </td>
                                                    <td>
                                                        <Link className='btn btn-primary' to={"/cancion/"+cancion.id}>Editar</Link>
                                                    </td>
                                                    <td>
                                                        <Link className='btn btn-primary' to={"/cancion/"+cancion.id+"/cancion"}>Cancion</Link>
                                                    </td>
                                                    <td>
                                                        <Button className='btn btn-danger' onClick={() => eliminarCancion(cancion)}>Eliminar</Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ListaCancion;