import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarMenu from "../../layout/Navbar";

export default function AddProjeto() {
  let navigate = useNavigate();

  const [projeto, setProjeto] = useState({
    nome: "",
  });

  const { name } = projeto;

  const onInputChange = (e) => {
    setProjeto({ ...projeto, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/v1/projetos/", projeto);
    navigate(-1);
  };

  return (
    <>
    <NavbarMenu />
    <div className="container">
      <div className="row">
      <div class="card col-md-6 offset-md-3 border rounded p-4 mt-2 my-card-table">
          <h2 className="text-center m-4">Novo Projeto</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label" required>
                Nome
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Digite o nome do projeto"
                name="nome"
                value={name}
                onChange={(e) => onInputChange(e)}
                aria-describedby="inputGroupPrepend"
                required
              />
            </div>
            <button type="submit" className="btn my-btn-confirm">
              Confirmar
            </button>
            <Link className="btn btn-outline-secondary mx-2" to="/projetos">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}