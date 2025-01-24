import { Button, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

  
  export function AuthenticationRequired() {
    return (
      <Container>
        <h5>Требуется авторизация</h5>
        <p>для доступа к ресурсу необходимо выполнить <Link to='/signin'>вход</Link></p>
      </Container>
    );
  }