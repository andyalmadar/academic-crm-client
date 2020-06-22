import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// IMPORTACIÓN DE MIS COMPONENTES
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
// IMPORTACIÓN DE MIS COMPONENTES (FIN)

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache({
        addTypename: false
    }),
    onError: ({networkError, graphQLErrors}) => {
        console.log('Errores de graphQL:', graphQLErrors);
        console.log('Errores de network:', networkError);
    }
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <>
                        <Header />
                        <div className="container">
                            <Switch>
                                <Route exact path="/clientes" component={Clientes} />
                                <Route exact path="/cliente/nuevo" component={NuevoCliente} />
                                <Route exact path="/cliente/editar/:id" component={EditarCliente} />
                                <Route exact path="/productos" component={Productos} />
                                <Route exact path="/producto/nuevo" component={NuevoProducto} />
                                <Route exact path="/producto/editar/:id" component={EditarProducto} />
                                <Route exact path="/pedido/nuevo/:id" component={NuevoPedido} />
                                <Route exact path="/pedidos/:id" component={PedidosCliente} />
                                <Route exact path="/panel" component={Panel} />
                                <Route exact path="/registro" component={Registro} />
                                <Route exact path="/login" component={Login} />
                            </Switch>
                        </div>
                    </>
                </Router>
            </ApolloProvider>
        )
    }
}

export default App;
