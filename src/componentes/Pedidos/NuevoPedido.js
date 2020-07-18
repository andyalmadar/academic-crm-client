import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { PRODUCTOS_QUERY } from '../../queries'

import ContenidoPedido from './ContenidoPedido';
import DatosCliente from './DatosCliente';

import '../../spinner.css'

class NuevoPedido extends Component {
    state = { }

    render() {
        const { id } = this.props.match.params; 
        const idVendedor = this.props.session.getUsuario.id;

        return (
            <>
                <h2 className="text-center mb-5">Nuevo pedido</h2>

                <div className="row">
                    <div className="col-md-3">
                        <DatosCliente 
                            id={id}
                        />
                    </div>
                    <div className="col-md-9">
                        <Query query={PRODUCTOS_QUERY} variables={{hideSoldOut: true}}>
                            {({ loading, error, data }) => {
                                if (loading) {
                                    return (
                                        <div className="spinner">
                                            <div className="double-bounce1"></div>
                                            <div className="double-bounce2"></div>
                                        </div>
                                    )
                                }
                                if (error) {
                                    return `Error: ${error.message}`;
                                }

                                return (
                                    <ContenidoPedido 
                                        productos={data.getProductos}
                                        id={id}
                                        idVendedor={idVendedor}
                                    />
                                )
                            }}
                        </Query>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(NuevoPedido);