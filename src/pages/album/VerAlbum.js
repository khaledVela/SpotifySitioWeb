import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const VerAlbum = () => {
    const {id} = useParams();
    const [albumList, setAlbumList] = useState([]);
    const [cancionList, setCancionList] = useState([]);
    useEffect(() => {
        fetchAlbum();
        fetchCancion();
    },[])

    const fetchAlbum = () => {
        axios.get("http://localhost:8080/segParcial/?controller=album&action=artista&id="+id)
            .then(res => {
                setAlbumList(res.data);
            }).catch(err => {
                console.log(err);
            });
    }

    const fetchCancion = () => {
        axios.get("http://localhost:8080/segParcial/?controller=cancion&action=list")
            .then(res => {
                setCancionList(res.data);
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
                                <h1>Lista</h1>
                            </Card.Title>
                            <div>
                                {albumList.map((album) => {
                                        return (
                                            <Table>
                                                <thead>
                                                    <tr key={album.id}>
                                                        <td>
                                                            <img src={"http://localhost:8080/segParcial/img/album/"+album.id +".jpg"} alt={album.nombre} width="100" height="100" />
                                                        </td>
                                                        <td>{album.nombre}</td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {cancionList.map((cancion) => {
                                                    if(cancion.album == album.id){
                                                        return (
                                                            <tr key={cancion.id}>
                                                                <td>{cancion.nombre}</td>
                                                                <td>
                                                                    <audio controls>
                                                                        <source src={"http://localhost:8080/segParcial/img/cancion/"+cancion.id +".mp3"} alt={cancion.nombre} width="100" height="100"/>
                                                                    </audio>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }})
                                                }
                                                </tbody>
                                            </Table>
                                        );
                                    })}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default VerAlbum;