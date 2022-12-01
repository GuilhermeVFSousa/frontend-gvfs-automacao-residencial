import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarMenu from "../../layout/Navbar";

export default function AddAmbiente() {
  let navigate = useNavigate();

  const [ambiente, setProjects] = useState({
    nome:"",
    projeto: "",
  });

  const [ambi, setProjeto] = useState([]);


  const { nome, projeto } = ambiente;

  

  const loadProjects = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/projetos/");
    setProjeto(result.data);
  };

  const onInputChange = (e) => {
    setProjects({ ...ambiente, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    if (nome === ' ') {
      window.alert("Informe um nome válido!")
    }
    if(projeto == null) {
      window.alert("Selecione um Projeto!")
    }
    if(projeto === '') {
      window.alert("Selecione um Projeto!")
    }
    e.preventDefault();
    await axios.post("http://localhost:8080/api/v1/ambientes/", ambiente);
    navigate(-1);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <>
    <NavbarMenu />
    <div className="container">
      <div className="row">
        <div className="">
        <div class="card col-md-6 offset-md-3 border rounded p-4 mt-2 my-card-table">
          <h2 className="text-center m-4">Novo Ambiente</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label" required>
                Nome
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Digite o nome do ambiente"
                name="nome"
                value={nome}
                onChange={(e) => onInputChange(e)}
                aria-describedby="inputGroupPrepend"
                required
              />
              <label htmlFor="Project" className="form-label" required>
                Projeto
              </label>
              <select class="form-select form-select-sm" aria-label=".form-select-sm example" name="projeto" value={projeto} onChange={(e) => onInputChange(e)} required>
        <option value={0}>Selecione um Projeto</option>
        {ambi.map(user => (<option key={user.id} name="projeto" label={user.nome} value={user.id}>{projeto}</option>))}
      </select>
            </div>
            <button type="submit" className="btn my-btn-confirm">
              Confirmar
            </button>
            <button className="btn btn-outline-secondary mx-2" onClick={() => navigate(-1)}>Cancelar</button>
          </form>
        </div>
      </div>
      </div>
    </div>
    </>
  );
}