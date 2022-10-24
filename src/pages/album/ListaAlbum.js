import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListaAlbum = () => {

    const [artistaList, setArtistaList] = useState([]);
    const [albumList, setAlbumList] = useState([]);
    useEffect(() => {
        fetchArtista();
        fetchAlbum();
    },[])

    const fetchArtista = () => {
        axios.get("http://localhost:8080/segParcial/?controller=artista&action=list")
            .then(res => {
                setArtistaList(res.data);
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

    const eliminarAlbum = (album) => {
        if(!window.confirm("¿Está seguro que desea eliminar el album "+album.nombre+"?")){
            return;
        }
        axios.delete("http://localhost:8080/segParcial/?controller=album&action=delete&id="+album.id)
            .then(res => {
                fetchAlbum();
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
                                <h1>Lista de Artista</h1>
                            </Card.Title>
                            <div>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Nombre</th>
                                            <th>Artista</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {albumList.map((album) => {
                                            return (
                                                <tr key={album.id}>
                                                    <td>
                                                        <img src={"http://localhost:8080/segParcial/img/album/"+album.id +".jpg"} alt={album.nombre} width="100" height="100" />
                                                    </td>
                                                    <td>{album.nombre}</td>
                                                    <td>
                                                        {artistaList.map((artista) => {
                                                            if(artista.id == album.artista){
                                                                return artista.nombre;
                                                            }
                                                        })}
                                                    </td>
                                                    <td>
                                                        <Link className='btn btn-primary' to={"/album/"+album.id}>Editar</Link>
                                                    </td>
                                                    <td>
                                                        <Link className='btn btn-primary' to={"/album/"+album.id+"/foto"}>Foto</Link>
                                                    </td>
                                                    <td>
                                                        <Button className='btn btn-danger' onClick={() => eliminarAlbum(album)}>Eliminar</Button>
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

export default ListaAlbum;