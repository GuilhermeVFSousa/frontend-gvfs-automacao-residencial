import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarMenu from "../../layout/Navbar";

export default function EditLuminaria() {
  let navigate = useNavigate();

  const [ luminaria, setLuminarias] = useState({
    nome: "",
    id:null,
    ambiente: null
  });



  const { id } = useParams();

  let { nome, ambiente } = luminaria;


  const backPage = (e) => {
    navigate(-1);
  }

 

  const onInputChange = (e) => {
    setLuminarias({ ...luminaria, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProjeto();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/v1/luminarias/lum/${id}`, luminaria);
    navigate(-1);
  };

  const loadProjeto = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/luminarias/${id}`);
    setLuminarias(result.data);
    delete result.data[ambiente.luminarias[0]];
    ambiente = result.data.ambiente.id
  };

  return (
    <>
    <NavbarMenu />
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar Luminária</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              Nome
              
                <React.Fragment>
              <input
                type={"text"}
                className="form-control"
                placeholder="Insira o novo nome da Luminária"
                name="nome"
                value={nome}
                onChange={(e) => onInputChange(e)}
                required/>
                
                </React.Fragment>
              
            </div>
        <button type="submit" className="btn btn-primary">
              Confirmar
            </button>
            <button type="reset" className="btn btn-danger mx-2" to="/projetos" onClick={(e)=> backPage()}>
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}