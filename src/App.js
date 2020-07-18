import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './componentes/Layout/Header';
import Clientes from './componentes/Clientes/Clientes';
import EditarCliente from './componentes/Clientes/EditarCliente';
import NuevoCliente from './componentes/Clientes/NuevoCliente';
import Productos from './componentes/Productos/Productos';
import EditarProducto from './componentes/Productos/EditarProducto';
import NuevoProducto from './componentes/Productos/NuevoProducto';
import PedidosCliente from './componentes/Pedidos/PedidosCliente';
import NuevoPedido from './componentes/Pedidos/NuevoPedido';
import Panel from './componentes/Panel/Panel';
import Registro from './componentes/Auth/Registro';
import Login from './componentes/Auth/Login';
import Session from './componentes/Session';

const App = ({ refetch, session }) => {
    const { getUsuario } = session;
    const mensaje = getUsuario ? `Bienvenido/a, ${getUsuario.nombre}` : <Redirect to="/login" />

    return (
        <Router>
            <Header session={session} />
            <div className="container">
                <p className="text-right">
                    {mensaje}
                </p>
                <Switch>
                    <Route exact path="/clientes" render={() => <Clientes session={session} />} />
                    <Route exact path="/cliente/nuevo" render={() => <NuevoCliente session={session} />} />
                    <Route exact path="/cliente/editar/:id" component={EditarCliente} />
                    <Route exact path="/productos" component={Productos} />
                    <Route exact path="/producto/nuevo" component={NuevoProducto} />
                    <Route exact path="/producto/editar/:id" component={EditarProducto} />
                    <Route exact path="/pedido/nuevo/:id" render={() => <NuevoPedido session={session} />} />
                    <Route exact path="/pedidos/:id" component={PedidosCliente} />
                    <Route exact path="/panel" component={Panel} />
                    <Route exact path="/registro" render={() => <Registro session={session} />} />
                    <Route exact path="/login" render={() => <Login refetch={refetch} />} />
                </Switch>
            </div>
        </Router>
    )
}

const RootSession = Session(App);

export { RootSession }