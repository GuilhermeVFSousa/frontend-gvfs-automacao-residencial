import React, { useState } from "react";
import Input from "../../components/Input";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/inicio");
  };

  return (
    <>
    <C.Container>
      <C.Content>
      <img alt="Logomarca" src="https://i.postimg.cc/v8LFNXgZ/logo-aut-res-azul.png"/>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}/>
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}/>
        <C.labelError>{error}</C.labelError>
        <button className="btn my-btn-confirm" onClick={handleLogin}>Entrar</button>
        <C.LabelSignup>
          Não possui cadastro?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
    </>
  );
};

export default Signin;