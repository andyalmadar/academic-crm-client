import React, { Component } from 'react';
import { Query } from 'react-apollo';

import FormularioEditarCliente from './FormularioEditarCliente';

import { CLIENTE_QUERY } from '../../queries'

class EditarCliente extends Component {
    state = {}

    render() {
        const { id } = this.props.match.params;

        return (
            <>
                <h2 className="text-center">Editar cliente</h2>

                <div className="row justify-content-center">
                    <Query query={CLIENTE_QUERY} variables={{id}}>
                        {({loading, error, data, refetch}) => {
                            console.log(data);

                            if (loading) {
                                return `Cargando...`;
                            }
                            if (error) {
                                return `Error: ${error.message}`;
                            }

                            return (
                                <FormularioEditarCliente
                                    cliente={data.getCliente}
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

export default EditarCliente;