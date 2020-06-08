import React, { Component } from 'react';

class Producto extends Component {
    state = {
        
    }

    render() {
        const { producto } = this.props;

        return (
            <>
                <tr>
                    <td>{producto.nombre}</td>
                    <td>$ {producto.precio}</td>
                    <td>{producto.stock}</td>
                    <td>
                        <input 
                            min="0"
                            type="number"
                            className="form-control"
                            onChange={e => {
                                if (e.target.value > producto.stock) {
                                    e.target.value = producto.stock;
                                }
                                if (e.target.value < 0) {
                                    e.target.value = 0;
                                }
                                
                                this.props.actualizarCantidad(e.target.value, this.props.index);
                            }}
                        />
                    </td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-danger font-weight-bold"
                            onClick={e => this.props.eliminarProducto(this.props.id)}
                        >
                            &times; Eliminar
                        </button>
                    </td>
                </tr>
            </>
        );
    }
}

export default Producto;