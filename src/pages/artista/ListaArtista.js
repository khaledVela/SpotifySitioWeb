import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListaArtista = () => {

    const [artistaList, setArtistaList] = useState([]);
    const [generoList, setGeneroList] = useState([]);
    useEffect(() => {
        fetchArtista();
        fetchGenero();
    },[])

    const fetchArtista = () => {
        axios.get("http://localhost:8080/segParcial/?controller=artista&action=list")
            .then(res => {
                setArtistaList(res.data);
            }).catch(err => {
                console.log(err);
            });
    }

    const fetchGenero = () => {
        axios.get("http://localhost:8080/segParcial/?controller=genero&action=list")
            .then(res => {
                setGeneroList(res.data);
            }).catch(err => {
                console.log(err);
            });
    }

    const eliminarArtista = (artista) => {
        if(!window.confirm("¿Está seguro que desea eliminar el artista "+artista.nombre+"?")){
            return;
        }
        axios.delete("http://localhost:8080/segParcial/?controller=artista&action=delete&id="+artista.id)
            .then(res => {
                fetchArtista();
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
                                            <th>Genero</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {artistaList.map((artista) => {
                                            return (
                                                <tr key={artista.id}>
                                                    <td>
                                                        <img src={"http://localhost:8080/segParcial/img/artista/"+artista.id +".png"} alt={artista.nombre} width="100" height="100" />
                                                    </td>
                                                    <td>{artista.nombre}</td>
                                                    <td>
                                                        {generoList.map((genero) => {
                                                            if(genero.id == artista.genero){
                                                                return genero.nombre;
                                                            }
                                                        })}
                                                    </td>
                                                    <td>
                                                        <Link className='btn btn-primary' to={"/artista/"+artista.id}>Editar</Link>
                                                    </td>
                                                    <td>
                                                        <Link className='btn btn-primary' to={"/artista/"+artista.id+"/foto"}>Foto</Link>
                                                    </td>
                                                    <td>
                                                        <Button className='btn btn-danger' onClick={() => eliminarArtista(artista)}>Eliminar</Button>
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

export default ListaArtista;