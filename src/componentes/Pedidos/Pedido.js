import React from "react";
import { Query, Mutation } from "react-apollo";

import { PRODUCTO_QUERY } from '../../queries';
import { ACTUALIZAR_PEDIDO } from '../../mutations';

import ResumenProducto from './ResumenProducto';

const Pedido = (props) => {
	const { pedido } = props;

	const fecha = new Date(Number(pedido.fecha));
	
	const classPedido = (pedido.estado === "PENDIENTE") ? (
		"bg-light"
	) : ((pedido.estado === "CANCELADO") ? (
		"bg-danger"
	) : (
		"bg-success"
	))

	return (
		<div className="col-md-4">
			<div className={`card mb-3 ${classPedido}`}>
				<div className="card-body">
					<p className="card-text font-weight-bold ">
						Estado:
						<Mutation mutation={ACTUALIZAR_PEDIDO} >
							{
								actualizarPedido => (
									<select
										className="form-control my-3"
										value={pedido.estado}
										onChange={e => {
											const formulario = {
												id: pedido.id,
												pedido: pedido.pedido,
												fecha: pedido.fecha,
												total: pedido.total,
												cliente: props.cliente,
												estado: e.target.value
											}

											actualizarPedido({
												variables: {
													formulario,
													estadoAnterior: pedido.estado
												}
											})
										}}
									>
										<option value="PENDIENTE">PENDIENTE</option>
										<option value="COMPLETADO">COMPLETADO</option>
										<option value="CANCELADO">CANCELADO</option>
									</select>
								)
							}
						</Mutation>
					</p>
					<p className="card-text font-weight-bold">
						ID:&nbsp;
						<span className="font-weight-normal">
                            {pedido.id}
                        </span>
					</p>
					<p className="card-text font-weight-bold">
						Fecha:&nbsp;
						<span className="font-weight-normal">
                            {fecha.toLocaleString('es-AR')}
                        </span>
					</p>
					<p className="card-text font-weight-bold">
						Total:&nbsp;
						<span className="font-weight-normal">
                            $ {pedido.total}
                        </span>
					</p>

					<h4 className="card-text mb-3">Productos del pedido</h4>
					{pedido.pedido.map((producto, index) => (
						<Query key={pedido.id + producto.id} query={PRODUCTO_QUERY} variables={{id: producto.id}}>
							{
								({loading, error, data}) => {
									if (loading) {
										return "Cargando...";
									}
									if (error) {
										return `Error ${error.message}`;
									}

									return (
										<ResumenProducto
											key={producto.id + index}
											producto={data.getProducto}
											cantidad={producto.cantidad}
										/>
									);
								}
							}
						</Query>
					))}					
				</div>
			</div>
		</div>
	);
};

export default Pedido;
