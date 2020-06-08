import React from 'react';
import { withRouter } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import { NUEVO_PEDIDO } from '../../mutations';

const validarPedido = (props) => {
    let noValido = !props.productos || props.total <= 0;

    return noValido;
}

const GenerarPedido = (props) => {
    return (
        <Mutation
            mutation={NUEVO_PEDIDO}
            onCompleted={() => props.history.push('/clientes')}
        >
            {crearPedido => (
                <button 
                    type="button"
                    className="btn btn-warning mt-4"
                    disabled={validarPedido(props)}
                    onClick={e => {
                        const productosInput = props.productos.map(({nombre, precio, stock, ...objeto}) => objeto);

                        const formulario = {
                            pedido: productosInput,
                            total: props.total,
                            cliente: props.idCliente
                        }

                        crearPedido({
                            variables: {formulario}
                        })
                    }}
                >
                    Crear pedido
                </button>
            )}
        </Mutation>
    )
}

export default withRouter(GenerarPedido);