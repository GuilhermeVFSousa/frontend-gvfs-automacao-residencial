import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
import NavbarMenu from "../../layout/Navbar";


export default function Ambiente() {

  const [ambiente, setProjeto] = useState([]);

  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    loadProjeto();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  async function deleteLuminaria(idLum) {
    const answer = window.confirm("Deseja excluir a luminária de forma permanente?");
    if (answer) {
    const response = await fetch(`http://localhost:8080/api/v1/luminarias/${idLum}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });
    window.alert("Removido com sucesso!")
    loadProjeto();
    return await response.json();
    }
    
  }

  const loadProjeto = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/ambientes/todos/${id}`);
    setProjeto(result.data);
  };

  const deleteAmbiente = async (id) => {
    try {
    const answer = window.confirm("Deseja excluir o ambiente de forma permanente?");
    if (answer) {
    await axios.delete(`http://localhost:8080/api/v1/ambientes/${id}`);
    loadProjeto();
    alert("Removido com sucesso!")
    }
  }
  catch(error) {
    window.alert("Erro!\n\nPara remover um ambiente, não pode conter luminárias vinculadas.")
  }
  };
  

  return (
    <>
    <NavbarMenu />
    <div className="container">
      <td class="text-start"><button className="btn btn-md my-btn-back" onClick={() => navigate(-1)}><Icon.ArrowLeftCircleFill color="white" size={30} />  Voltar</button></td></div>
    <div className="container">
      <div className="py-4">
      <div className="card my-card-table">
        <table className="table table-hover">
          <thead className="table-secondary">
            <tr>
              <th class="text-start" scope="col">Ambiente</th>
              <th class="text-start" scope="col"> Luminárias
              </th>
              <th scope="col"><Link
                    className="btn mx-2 my-btn-add-project"
                    to={`/adicionar-ambiente`}
                  >
                    <Icon.PlusCircleFill color="white" size={20} /> Adicionar Ambiente
                  </Link></th>
            </tr>
          </thead>
          <tbody>
            {ambiente.map(ambiente => (
              <tr>
                <td class="text-start">{ambiente.nome}</td>
                <td>{ambiente.luminarias.map(lumi => (
                  <React.Fragment>
                    
                    <div><td>{lumi.nome}</td>
            <td><button className="btn my-small-btn-lumi-rem" to="/projetos" type="submit"
            onClick={() => deleteLuminaria(lumi.id)} alt="Girl in a jacket"> <Icon.TrashFill color="black" size={18} />
              Remover
            </button> </td></div>
                  </React.Fragment>
                ))}
                
                </td>
                <td>
                  <Link
                    className="btn btn-secondary mx-2"
                    to={`/adicionar-luminaria/${ambiente.projeto.id}`}
                  >
                    <Icon.PlusCircleFill color="white" size={16} /> Luminárias
                  </Link>
                  <Link
                    className="btn btn-secondary mx-2"
                    to={`/editar-ambiente/${ambiente.id}`}
                  >
                    <Icon.PencilSquare color="white" size={17} /> 
                    &nbsp;Editar
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteAmbiente(ambiente.id)}
                  >
                    <Icon.TrashFill color="white" size={16} />
                    &nbsp;Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
    </>
  );
}