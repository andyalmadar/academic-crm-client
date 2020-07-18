import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import { CLIENTES_QUERY } from '../../queries';
import { ELIMINAR_CLIENTE } from '../../mutations';
import Exito from '../Alertas/Exito';

import Paginador from '../Paginador';

class Clientes extends Component {
    limite = 5;

    state = {
        paginador: {
            offset: 0,
            pagina: 1
        },
        alerta: {
            mostrar: false,
            mensaje: ""
        }
    }

    paginaAnterior = () => {
        this.setState({
            paginador: {
                offset: this.state.paginador.offset - this.limite,
                pagina: this.state.paginador.pagina - 1
            }
        });
    }

    paginaSiguiente = () => {
        this.setState({
            paginador: {
                offset: this.state.paginador.offset + this.limite,
                pagina: this.state.paginador.pagina + 1
            }
        });
    }

    render() {
        const {alerta: { mostrar, mensaje }} = this.state;
        const alerta = (mostrar) ? <Exito mensaje={mensaje} /> : "";

        const { rol } = this.props.session.getUsuario;
        const usuarioId = rol === "VENDEDOR" ? this.props.session.getUsuario.id : '';

        return (
            <Query
                query={CLIENTES_QUERY}
                pollInterval={1000}
                variables={{
                    limite: this.limite,
                    offset: this.state.paginador.offset,
                    vendedor: usuarioId
                }}
            >
                {
                    ({loading, error, data, startPolling, stopPolling}) => {
                        if (loading) {
                            return `Cargando...`;
                        }
                        if (error) {
                            return `Error: ${error.message}`;
                        }

                        return (
                            <>
                                <h2 className="text-center">Lista de clientes</h2>

                                {alerta}

                                <ul className="list-group mt-4">
                                    {
                                        data.getClientes.map(value => {
                                            const {id, nombre, apellido, empresa} = value;

                                            return (
                                                <li key={id} className="list-group-item">
                                                    <div className="row justify-content-between align-items-center">
                                                        <div className="col-md-8 d-flex justify-content-between align-items-center">
                                                            {nombre} {apellido} - {empresa}
                                                        </div>
                                                        <div className="col-md-4 d-flex justify-content-end">
                                                            <Link to={`/pedido/nuevo/${id}`} className="btn btn-warning d-block d-md-inline-block mr-2">
                                                                &#43; Nuevo pedido
                                                            </Link>
                                                            <Link to={`/pedidos/${id}`} className="btn btn-primary d-block d-md-inline-block mr-2">
                                                                Ver pedidos
                                                            </Link>
                                                            <Mutation 
                                                                mutation={ELIMINAR_CLIENTE}
                                                                onCompleted={(data) => {
                                                                    this.setState({
                                                                        alerta: {
                                                                            mostrar: true,
                                                                            mensaje: data.eliminarCliente
                                                                        }
                                                                    }, () => {
                                                                        setTimeout(() => {
                                                                            this.setState({
                                                                                alerta: {
                                                                                    mostrar: false,
                                                                                    mensaje: ""
                                                                                }
                                                                            });
                                                                        }, 3000);
                                                                    });
                                                                }}
                                                            >
                                                                {
                                                                    eliminarCliente => (
                                                                        <button type="button" className="btn btn-danger d-block d-md-inline-block mr-2" onClick={() => {
                                                                            if (window.confirm("¿Estás seguro/a?")) {
                                                                                eliminarCliente({
                                                                                    variables: {
                                                                                        "id": id
                                                                                    }
                                                                                })
                                                                            }
                                                                        }}>
                                                                            &times; Eliminar
                                                                        </button>
                                                                    )
                                                                }
                                                            </Mutation>
                                                            <Link to={`/cliente/editar/${id}`} className="btn btn-success d-block d-md-inline-block">
                                                                Editar cliente
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>

                                <Paginador
                                    pagina={this.state.paginador.pagina}
                                    total={data.totalClientes}
                                    limite={this.limite}
                                    paginaAnterior={this.paginaAnterior}
                                    paginaSiguiente={this.paginaSiguiente}
                                />
                            </>
                        );
                    }
                }
            </Query>
        );
    }
}

export default Clientes;