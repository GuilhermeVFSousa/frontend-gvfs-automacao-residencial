import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
import NavbarMenu from "../../layout/Navbar";


export default function ViewProjetos() {
  const [ambientes, setProjects] = useState([]);

  // eslint-disable-next-line no-unused-vars
  let { id1 } = ''
  const { id } = useParams();
 

  let navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function atualizaEstadoOn(id1) {
    const response = await fetch(`http://localhost:8080/api/v1/luminarias/${id1}/atualiza-status-on`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
    });
    loadProjects();
    return await response.json();
    
  }

  async function atualizaEstadoOff(id1) {
    const response = await fetch(`http://localhost:8080/api/v1/luminarias/${id1}/atualiza-status-off`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
    });
    loadProjects();
    return await response.json();
    
  }

  const loadProjects = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/ambientes/todos/${id}`);
    setProjects(result.data);
  };


  return (
    <>
    <NavbarMenu />
    <div className="container my-container">
      <td class="text-start"><button className="btn btn-md my-btn-back" onClick={() => navigate(-1)}><Icon.ArrowLeftCircleFill color="white" size={30} />  Voltar</button></td></div>
    <div className="container my-container">
      <div className="py-4">
      <div class="card my-card-table">
      <table className="table table-hover my-table">
          <thead class="table-secondary tb-projeto-home">
            <tr>
              <th scope="col">Projeto</th>
              <th scope="col">Ambiente</th>
              <th scope="col">Luminarias</th>
              <th></th>
              </tr>
          </thead>
          <tbody>
            {ambientes.map(ambiente => (
              <tr key={ambiente.projeto.nome}>
                <td>{ambiente.projeto.nome}</td>
                <td>{ambiente.nome}</td>
                <td>{ambiente.luminarias.map(luminaria => (
                  <React.Fragment>
                    <div key={luminaria.mome}>{luminaria.nome}
                      </div>
                  </React.Fragment>))}
                </td>
                <td>{ambiente.luminarias.map(luminaria => (
                  <React.Fragment>
                    <div key={luminaria.nome}>
                      <td>
                      <span class={luminaria.estado !== 'DESLIGADO' ? "badge rounded-pill mx-4 my-bagde1" : "badge rounded-pill mx-4 my-bagde2"}>
                      {luminaria.estado !== 'DESLIGADO' ? <span>ON</span> : "OFF"}
                        </span></td><td>
                        <button type="submit"
                        style={{display: luminaria.estado !== 'DESLIGADO' ? 'none' : 'block'}}
                        disabled={luminaria.estado !== 'DESLIGADO'}
                        value={id1=luminaria.id}
                        className="btn btn-light  my-small-btn-on"
                        onClick={(id) => atualizaEstadoOn(luminaria.id)}>
                        <Icon.LightbulbFill color="black" size={15} />
                         Ligar&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                        
                        <button type="submit"
                        style={{display: luminaria.estado !== 'LIGADO' ? 'none' : 'block'}}
                        disabled={luminaria.estado !== 'LIGADO'}
                        value={id1=luminaria.id}
                        className="btn btn-light  my-small-btn-off"
                        onClick={(id) => atualizaEstadoOff(luminaria.id)}>
                        <Icon.LightbulbOff color="black" size={15} />Desligar
                        </button>
                        </td>
                  </div>    
                  </React.Fragment>))}
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