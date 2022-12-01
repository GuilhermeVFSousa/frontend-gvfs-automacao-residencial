import React from "react";
import * as Icon from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function NavbarMenu() {

  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Navbar variant="dark" expand="lg" className="my-nav">
      <Container>
        <Navbar.Brand href="/"><img
              alt="Logomarca"
              src="https://i.postimg.cc/RZ2sx14q/logo.png"
            /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/projetos" className="mx-3"><Icon.HouseGearFill color="white" size={20} /> Início</Nav.Link>
            <Nav.Link href="/adicionar-projeto" className="mx-3"><Icon.PlusCircleFill color="white" size={20} /> Projetos</Nav.Link>
            <Nav.Link href="/adicionar-ambiente" className="mx-3"><Icon.PlusCircleFill color="white" size={20} /> Ambientes</Nav.Link>

            <button
                    className="btn mx-5 my-btn-loggout"
                    onClick={() => [signout(), navigate("/")]}>
                  <Icon.BoxArrowInRight color="white" size={18} />
                    &nbsp;&nbsp;Sair
                  </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
  </>
  );
}