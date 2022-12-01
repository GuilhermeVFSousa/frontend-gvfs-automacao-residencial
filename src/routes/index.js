import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AddAmbiente from "../pages/ambiente/AddAmbiente";
import Ambiente from "../pages/ambiente/Ambiente";
import EditAmbiente from "../pages/ambiente/EditAmbiente";
import AddLuminaria from "../pages/luminaria/AddLuminaria";
import EditLuminaria from "../pages/luminaria/EditLuminaria";
import Luminaria from "../pages/luminaria/Luminaria";
import AddProjeto from "../pages/projetos/AddProjeto";
import EditProjeto from "../pages/projetos/EditProjeto";
import Projetos from "../pages/projetos/Projetos";
import ViewProjetos from "../pages/projetos/ViewProjetos";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Signin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/inicio" element={<Private Item={Projetos} />} />
          <Route exact path="/visualizar-projeto/:id" element={<ViewProjetos />} />
          <Route exact path="/projetos" element={<Private Item={Projetos} />} />
          <Route exact path="/adicionar-projeto" element={<Private Item={AddProjeto} />} />
          <Route exact path="/editar-projeto/:id" element={<Private Item={EditProjeto} />} />
          <Route exact path="/ambientes-projeto/:id" element={<Private Item={Ambiente} />} />
          <Route exact path="/adicionar-ambiente" element={<Private Item={AddAmbiente} />} />
          <Route exact path="/editar-ambiente/:id" element={<Private Item={EditAmbiente} />} />
          <Route exact path="/luminarias-ambiente/:id" element={<Private Item={Luminaria} />} />
          <Route exact path="/adicionar-luminaria/:id" element={<Private Item={AddLuminaria} />} />
          <Route exact path="/editar-luminaria/:id" element={<Private Item={EditLuminaria} />} />
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;