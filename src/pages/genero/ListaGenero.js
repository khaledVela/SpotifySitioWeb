import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListaGenero = () => {

    const [generoList, setGeneroList] = useState([]);
    useEffect(() => {
        fetchGenero();
    },[])

    const fetchGenero = () => {
        axios.get("http://localhost:8080/segParcial/?controller=genero&action=list")
            .then(res => {
                setGeneroList(res.data);
            }).catch(err => {
                console.log(err);
            });
    }

    const eliminarGenero = (genero) => {
        if(!window.confirm("¿Está seguro que desea eliminar el genero "+genero.nombre+"?")){
            return;
        }
        axios.delete("http://localhost:8080/segParcial/?controller=genero&action=delete&id="+genero.id)
            .then(res => {
                fetchGenero();
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
                                <h1>Lista de Generos</h1>
                            </Card.Title>
                            <div>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Nombre</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {generoList.map((genero) => {
                                            return (
                                                <tr key={genero.id}>
                                                    <td>
                                                        <img src={"http://localhost:8080/segParcial/img/genero/"+genero.id +".png"} alt={genero.nombre} width="100" height="100" />
                                                    </td>
                                                    <td>{genero.nombre}</td>
                                                    <td>
                                                        <Link className='btn btn-primary' to={"/genero/"+genero.id}>Editar</Link>
                                                    </td>
                                                    <td>
                                                        <Link className='btn btn-primary' to={"/genero/"+genero.id+"/foto"}>Foto</Link>
                                                    </td>
                                                    <td>
                                                        <Button className='btn btn-danger' onClick={() => eliminarGenero(genero)}>Eliminar</Button>
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

export default ListaGenero;