import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const VerArtista = () => {
    const {id} = useParams();
    const [artistaList, setArtistaList] = useState([]);
    useEffect(() => {
        fetchArtista();
    },[])

    const fetchArtista = () => {
        axios.get("http://localhost:8080/segParcial/?controller=artista&action=generos&id="+id)
            .then(res => {
                setArtistaList(res.data);
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
                                                        <Link className='btn btn-primary' to={"/verAlbum/"+artista.id}>Album</Link>
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

export default VerArtista;