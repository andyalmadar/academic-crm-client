import React, { Component } from 'react';

import { NUEVO_PRODUCTO } from '../../mutations';
import { Mutation } from 'react-apollo';

const initialState = {
    nombre: '',
    precio: '',
    stock: ''
}

class NuevoProducto extends Component {
    state = {
        ...initialState
    };

    limpiarState = () => {
        this.setState({
            ...initialState
        });
    }

    actualizarState = ev => {
        const {name, value} = ev.target;

        this.setState({
            [name]: value
        })
    }

    validarForm = () => {
        const {nombre, precio, stock} = this.state;

        const noValido = !nombre || !precio || !stock;

        return noValido;
    }

    crearNuevoProducto = (e, nuevoProducto) => {
        e.preventDefault();

        // Acá hacemos la inserción en la base
        nuevoProducto().then(data => {
            this.limpiarState();
            this.props.history.push('/productos');
        });
    }

    render() {
        const {nombre, precio, stock} = this.state;
        const formulario = {
            nombre,
            precio: Number(precio),
            stock: Number(stock)
        };

        return (
            <>
                <h1 className="text-center mb-5">Nuevo producto</h1>
                <div className="row justify-content-center">
                    <Mutation
                        mutation={NUEVO_PRODUCTO}
                        variables={{formulario}}
                    >
                        {
                            (crearProducto, {loading, error, data}) => {
                                return(
                                    <form className="col-md-8" onSubmit={e => this.crearNuevoProducto(e, crearProducto)}>
                                        <div className="form-group">
                                            <label>Nombre:</label>
                                            <input 
                                                type="text"
                                                name="nombre" 
                                                className="form-control" 
                                                placeholder="Nombre del Producto"
                                                onChange={this.actualizarState}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Precio:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">$</div>
                                                </div>
                                                <input 
                                                    type="number" 
                                                    name="precio" 
                                                    className="form-control" 
                                                    placeholder="Precio del Producto"
                                                    onChange={this.actualizarState}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Stock:</label>
                                            <input 
                                                type="number" 
                                                name="stock" 
                                                className="form-control" 
                                                placeholder="stock del Producto" 
                                                onChange={this.actualizarState}
                                            />
                                        </div>
                                        <button
                                            disabled={this.validarForm()}
                                            type="submit" 
                                            className="btn btn-success float-right">
                                                Crear Producto
                                        </button>
                                    </form>
                                )
                            }
                        }
                    </Mutation>
                </div>
            </>
        );
    }
}

export default NuevoProducto;