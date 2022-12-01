import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarMenu from "../../layout/Navbar";



export default function EditProjeto() {
  let navigate = useNavigate();

  const [projeto, setProjeto] = useState({
    nome: ""
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
    if(projeto.nome.length === 0 || projeto.nome === ' ') {
      alert("Informe um nome")}
      else {
      await axios.put(`http://localhost:8080/api/v1/projetos/${id}`, projeto);
      navigate(-1);
    } 
    
  };
  

  const loadProjeto = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/projetos/${id}`);
    setProjeto(result.data);
  };

  return (
    <>
    <NavbarMenu />
    <div className="container">
      <div className="row">
      <div class="card col-md-6 offset-md-3 border rounded p-4 mt-2 my-card-table">
          <h2 className="text-center m-4">Editar Projeto</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              Nome
              <input
                type={"text"}
                className="form-control"
                placeholder="Insira o novo nome"
                name="nome"
                value={nome}
                onChange={(e) => onInputChange(e)}
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