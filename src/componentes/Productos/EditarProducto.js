import React, { Component } from 'react';
import { Query } from 'react-apollo';

import FormularioEditarProducto from './FormularioEditarProducto';

import { PRODUCTO_QUERY } from '../../queries'

class EditarProducto extends Component {
    state = {}

    render() {
        const { id } = this.props.match.params;

        return (
            <>
                <h2 className="text-center">Editar producto</h2>

                <div className="row justify-content-center">
                    <Query query={PRODUCTO_QUERY} variables={{id}}>
                        {({loading, error, data, refetch}) => {
                            if (loading) {
                                return `Cargando...`;
                            }
                            if (error) {
                                return `Error: ${error.message}`;
                            }

                            return (
                                <FormularioEditarProducto
                                    producto={data}
                                    id={id}
                                    refetch={refetch}        
                                />
                            );
                        }}
                    </Query>
                </div>
            </>
        );
    }
}

export default EditarProducto;