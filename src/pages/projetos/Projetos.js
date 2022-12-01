import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
import NavbarMenu from "../../layout/Navbar";



export default function Projetos() {
  const [projetos, setUsers] = useState([]);




  useEffect(() => {
    loadProjects();
  }, []);


  const loadProjects = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/projetos/");
    setUsers(result.data);
  };


  const deleteProjeto = async (id1) => {
    try {
    const answer = window.confirm("Deseja excluir o projeto de forma permanente?");
    if (answer) {
    await axios.delete(`/api/v1/projetos/${id1}`);
    loadProjects();
    alert("Removido com sucesso!")
    }
  }
  catch(error) {
    window.alert("Erro!\n\nPara ser removido, o projeto não pode conter ambientes ou luminárias.")
  }
  };

  return (
    <>
    <NavbarMenu />
    <div className="container my-container">
      <div className="py-4 my-container">
      <div className="card my-card-table">
        <table className="table table-hover my-table">
          <thead className="table-secondary tb-projeto-home">
            <tr>
              <th scope="col">Projeto</th>
              <th scope="col"><Link
                    className="btn mx-2 my-btn-add-project"
                    to={`/adicionar-projeto`}
                  >
                    <Icon.PlusCircleFill color="white" size={20} /> Adicionar Projeto
                  </Link></th>
            </tr>
          </thead>
          <tbody>
            {projetos.map(projeto => (
              <tr key={projeto.id}>
                <td>{projeto.nome}</td>
                
                <td>
                <Link
                    className="btn btn-secondary mx-2"
                    to={`/visualizar-projeto/${projeto.id}`}
                  >
                    <Icon.Display color="white" size={20} />
                    &nbsp;Visualizar
                  </Link>
                  <Link
                    className="btn btn-secondary mx-2"
                    to={`/ambientes-projeto/${projeto.id}`}
                  >
                  <Icon.Clipboard2DataFill color="white" size={18} />
                    &nbsp;Gerenciar
                  </Link>
                  <Link
                    className="btn btn-secondary mx-2"
                    to={`/editar-projeto/${projeto.id}`}
                  >
                  <Icon.PencilSquare color="white" size={18} />
                    &nbsp;Editar
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteProjeto(projeto.id)}
                  >
                  <Icon.TrashFill color="white" size={18} />
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