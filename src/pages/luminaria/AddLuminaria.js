import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarMenu from "../../layout/Navbar";

export default function AddLuminaria() {
  let navigate = useNavigate();

  const {id} = useParams();

  const [ambiente_, setProjects] = useState([], {
    nome:"",
    ambiente: "",
  });

  const [ambi, setAmbiente] = useState([], {
    nome: '',
    ambiente:'',
  });

  const { name, ambiente } = ambiente_;


  const loadProjects = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/ambientes/todos/${id}`,
    {headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000"
    },});
    setAmbiente(result.data);
  };

  const onInputChange = (e) => {
    setProjects({ ...ambiente_, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    if(ambiente_.nome === ' '){
      window.alert("Informe um nome válido!")
    }
    if(ambiente_.ambiente === 'Selecione um Ambiente'){
      window.alert("Selecione um Ambiente!")
    }
    if(ambiente_.ambiente === 0){
      window.alert("Selecione um Ambiente!")
    }
    if(ambiente_.ambiente === ''){
      window.alert("Selecione um Ambiente!")
    }
    e.preventDefault();
    await axios.post("/api/v1/luminarias/", ambiente_);
    navigate(-1);
    
  };

  useEffect(() => {
    loadProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <NavbarMenu />
    <div className="container">
      <div className="row">
      <div className="card col-md-6 offset-md-3 border rounded p-4 mt-2 my-card-table">
          <h2 className="text-center m-4">Nova Luminaria</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label" required>
                Nome
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Digite o nome da luminária"
                name="nome"
                value={name}
                onChange={(e) => onInputChange(e)}
                aria-describedby="inputGroupPrepend"
                required
              />
              <label htmlFor="Ambiente" className="form-label" required>
                Ambiente
              </label>
              <select className="form-select form-select-sm" aria-label=".form-select-sm example" name="ambiente" value={ambiente}
              onChange={(e) => onInputChange(e)} required>
        <option value={0}>Selecione um Ambiente</option>
        {ambi.map((ambi_, index) => (<option key={index} name="ambiente" label={ambi_.nome} value={ambi_.id}>{ambiente}</option>))}
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
    </>
  );
}
