import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

import AddAmbiente from './pages/ambiente/AddAmbiente';
import Ambiente from './pages/ambiente/Ambiente';
import AddProjeto from './pages/projetos/AddProjeto';
import EditProjeto from './pages/projetos/EditProjeto';
import Projetos from './pages/projetos/Projetos';
import EditAmbiente from './pages/ambiente/EditAmbiente';
import Luminaria from './pages/luminaria/Luminaria';
import EditLuminaria from './pages/luminaria/EditLuminaria';
import AddLuminaria from './pages/luminaria/AddLuminaria';
import ViewProjetos from './pages/projetos/ViewProjetos';
import NavbarMenu from './layout/Navbar';

function App() {

  return (
    <React.Fragment className='fragment'>
    <title>Automação Residencial</title>
    <div className="App">
 
      <Router>
        <NavbarMenu />
    
        <Routes>
          <Route exact path="/" element={<Projetos />} />
          <Route exact path="/visualizar-projeto/:id" element={<ViewProjetos />} />
          <Route exact path="/projetos" element={<Projetos />} />
          <Route exact path="/adicionar-projeto" element={<AddProjeto />} />
          <Route exact path="/editar-projeto/:id" element={<EditProjeto/>} />
          <Route exact path="/ambientes-projeto/:id" element={<Ambiente />} />
          <Route exact path="/adicionar-ambiente" element={<AddAmbiente />} />
          <Route exact path="/editar-ambiente/:id" element={<EditAmbiente />} />
          <Route exact path="/luminarias-ambiente/:id" element={<Luminaria />} />
          <Route exact path="/adicionar-luminaria/:id" element={<AddLuminaria />} />
          <Route exact path="/editar-luminaria/:id" element={<EditLuminaria />} />
        </Routes>
      </Router>
      
    </div>
    </React.Fragment>
  );
}

export default App;