import React from "react";
import { Query } from 'react-apollo';

import { PEDIDOS_QUERY } from "../../queries";

import Pedido from './Pedido';

import '../../spinner.css'

const PedidosCliente = (props) => {
	const cliente = props.match.params.id; // es el ID del cliente

	return (
		<>
			<h2 className="text-center mb-5">Pedidos del cliente</h2>
			<div className="row">
				<Query query={PEDIDOS_QUERY} variables={{ cliente }} pollInterval={500}>
                    {
                        ({ loading, error, data, startPolling, stopPolling }) => {
                            if (loading) {
                                return (
                                    <div className="spinner">
                                        <div className="double-bounce1"></div>
                                        <div className="double-bounce2"></div>
                                    </div>
                                );
                            }

                            if (error) {
                                return `Error: ${error.message}`;
                            }

                            return (
                                data.getPedidos.map(pedido => (
                                    <Pedido 
                                        key={pedido.id}
                                        cliente={cliente}
                                        pedido={pedido}
                                    />
                                ))
                            )
                        }
                    }
				</Query>
			</div>
		</>
	);
};

export default PedidosCliente;
