import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarMenu from "../../layout/Navbar";


export default function Luminaria() {
  let navigate = useNavigate();

  const [projeto, setProjeto] = useState([]);

  const [luminaria, setProjects] = useState({
    estado: "",
  })


  const { id } = useParams();

  // eslint-disable-next-line no-unused-vars
  const { estado } = luminaria;


  useEffect(() => {
    loadProjeto();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  const loadProjeto = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/luminarias/todos/${id}`);
    setProjeto(result.data);
  };

  // eslint-disable-next-line no-unused-vars
  const onInputChange = (e) => {
    setProjects({ ...projeto, [e.target.name]: e.target.value });
  };

  // eslint-disable-next-line no-unused-vars
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/v1/luminarias/${id}/atualiza-status`, luminaria);
    navigate(-1);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/ambientes/${id}`);
    loadProjeto();
  };

  return (
    <>
    <NavbarMenu />
    <div className="container">
      <div className="py-4">
      <table className="table table-striped table-hover">
          <thead class="table-secondary">
          
            <Link
               className="btn btn-primary mx-2"
               to={`/adicionar-ambiente`}>
                    + Adicionar Luminária
            </Link>
          </thead>
      </table>
        <table className="table table-striped table-hover">
          <thead class="table-secondary">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Luminária</th>
              <th scope="col">Estado</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {projeto.map((projeto, index) => (
              <tr>
                <th scope="row" key={index}>
                  {projeto.id}
                </th>
                <td>{projeto.nome}</td>
                <td>
                  <div>
                    <span class={projeto.estado !== 'DESLIGADO' ? "badge rounded-pill bg-success mx-4" : "badge rounded-pill bg-secondary mx-4"}>
                      {projeto.estado !== 'DESLIGADO' ? <span>ON&nbsp;</span> : "OFF"}
                    </span>
                    </div>
                </td>
                <td>
                  <Link
                    className="btn btn-secondary mx-2"
                    to={`/editar-ambiente/${projeto.id}`}>
                    Gerenciar
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(projeto.id)}>
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}