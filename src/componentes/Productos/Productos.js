import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import { PRODUCTOS_QUERY } from '../../queries';
import { ELIMINAR_PRODUCTO } from '../../mutations';
import Exito from '../Alertas/Exito';

import Paginador from '../Paginador';

class Productos extends Component {
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

    // método que se pasa como prop al componente Paginador
    paginaAnterior = () => {
        this.setState({
            paginador: {
                offset: this.state.paginador.offset - this.limite,
                pagina: this.state.paginador.pagina - 1
            }
        });
    }

    // método que se pasa como prop al componente Paginador
    paginaSiguiente = () => {
        this.setState({
            paginador: {
                offset: this.state.paginador.offset + this.limite,
                pagina: this.state.paginador.pagina + 1
            }
        });
    }

    render() {
        // Este destructuring va dos niveles abajo y declara dos constantes QUE SON mostrar Y mensaje. NO DECLARA LA CONSTANTE alerta.
        const {alerta: {mostrar, mensaje}} = this.state;

        const alerta = (mostrar) ? <Exito mensaje={mensaje} /> : "";

        return (
            <>
                <h1 className="text-center mb-5">Productos</h1>

                {alerta}

                <Query query={PRODUCTOS_QUERY} pollInterval={1000} variables={{limite: this.limite, offset: this.state.paginador.offset}}>
                    {({loading, error, data, startPolling, stopPolling}) => {
                        if (loading) {
                            return `Cargando...`;
                        }
                        if (error) {
                            return `Error: ${error.message}`;
                        }

                        return (
                            <>
                                <table className="table">
                                    <thead>
                                        <tr className="table-primary">
                                            <th scope="col">
                                                Nombre
                                            </th>
                                            <th scope="col">
                                                Precio
                                            </th>
                                            <th scope="col">
                                                Stock
                                            </th>
                                            <th scope="col">
                                                Editar
                                            </th>
                                            <th scope="col">
                                                Eliminar
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.getProductos.map(item => {
                                                const { id, stock } = item;

                                                const clase = stock < 50 ? (
                                                    "table-danger text-light"
                                                ) : (
                                                    stock < 100 ? (
                                                        "table-warning text-light"
                                                    ) : (
                                                        ""
                                                    )
                                                );

                                                return (
                                                    <tr key={id} className={clase}>
                                                        <td>
                                                            {item.nombre}
                                                        </td>
                                                        <td>
                                                            {item.precio}
                                                        </td>
                                                        <td>
                                                            {item.stock}
                                                        </td>
                                                        <td>
                                                            <Link to={`/producto/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                                                Editar
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <Mutation
                                                                mutation={ELIMINAR_PRODUCTO}
                                                                onCompleted={(data) => {
                                                                    this.setState({
                                                                        alerta: {
                                                                            mostrar: true,
                                                                            mensaje: data.eliminarProducto
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
                                                                    eliminarProducto => (
                                                                        <button 
                                                                            onClick={
                                                                                () => {
                                                                                    if (window.confirm("¿Querés borrar este producto?")) {
                                                                                        eliminarProducto({
                                                                                            variables: {
                                                                                                id
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                }
                                                                            }
                                                                            type="button"
                                                                            className="btn btn-danger"
                                                                        >
                                                                            &times; Eliminar
                                                                        </button>
                                                                    )
                                                                }
                                                            </Mutation>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Paginador
                                    pagina={this.state.paginador.pagina}
                                    total={data.totalProductos}
                                    limite={this.limite}
                                    paginaAnterior={this.paginaAnterior}
                                    paginaSiguiente={this.paginaSiguiente}
                                />
                            </>
                        );
                    }}
                </Query>
            </>
        );
    }
}

export default Productos;