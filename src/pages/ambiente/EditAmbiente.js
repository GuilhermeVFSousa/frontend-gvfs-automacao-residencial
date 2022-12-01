import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarMenu from "../../layout/Navbar";

export default function EditAmbiente() {
  let navigate = useNavigate();

  const [projeto, setProjeto] = useState({
    nome: "",
    id: null
  });


  const { id } = useParams();

  const { nome } = projeto;

  const onInputChange = (e) => {
    setProjeto({ ...projeto, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProjeto();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/v1/ambientes/${id}`, projeto);
    navigate(-1);
  };

  const loadProjeto = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/ambientes/${id}`);
    setProjeto(result.data);
  };

  return (
    <>
    <NavbarMenu />
    <div className="container">
      <div className="row">
      <div className="card col-md-6 offset-md-3 border rounded p-4 mt-2 my-card-table">
          <h2 className="text-center m-4">Editar Ambiente</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              Nome
              <input
                type={"text"}
                className="form-control"
                placeholder="Insira o novo nome do Ambiente"
                name="nome"
                value={nome}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <button type="submit" className="btn my-btn-confirm">
              Confirmar
            </button>
            <Link className="btn btn-outline-secondary mx-2" to="/projetos" relative="path">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}