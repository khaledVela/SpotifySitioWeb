import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
const Menu = () => {
    return (
        <Navbar bg="dark" expand="md" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Spotify</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Generos" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/">Menu</Link>
                            <Link className="dropdown-item" to="/genero/list">Lista de Genero</Link>
                            <Link className="dropdown-item" to="/genero/create">Crear Genero</Link>
                        </NavDropdown>
                        <NavDropdown title="Artista" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/artista/list">Lista de Artista</Link>
                            <Link className="dropdown-item" to="/artista/create">Crear Artista</Link>
                        </NavDropdown>
                        <NavDropdown title="Album" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/album/list">Lista de Album</Link>
                            <Link className="dropdown-item" to="/album/create">Crear Album</Link>
                        </NavDropdown>
                        <NavDropdown title="Cancion" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/cancion/list">Lista de Cancion</Link>
                            <Link className="dropdown-item" to="/cancion/create">Crear Cancion</Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;