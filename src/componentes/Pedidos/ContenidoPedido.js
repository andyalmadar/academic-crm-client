import React, { Component } from 'react';
import Select from 'react-select';
import Animated from 'react-select/animated'

import Resumen from './Resumen'
import GenerarPedido from './GenerarPedido';

import Error from '../Alertas/Error';

class ContenidoPedido extends Component {
    state = {
        productos: [],
        total: 0
    }

    seleccionarProducto = (productos) => {
        console.log(productos);
        this.setState({
            productos: productos === null ? [] : productos
        }, () => {
            this.actualizarTotal()
        });
    }

    actualizarTotal = () => {
        const productos = this.state.productos;

        if (productos.length === 0) {
            this.setState({
                total: 0
            });

            return;
        }

        let nuevoTotal = 0;

        productos.map(producto => (nuevoTotal += ((producto.cantidad || 0) * producto.precio)));

        this.setState({
            productos: productos.map(producto => ({...producto, cantidad: producto.cantidad || 0})),
            total: nuevoTotal
        })
    }

    actualizarCantidad = (cantidad, index) => {
        const productos = this.state.productos;

        productos[index].cantidad = Number(cantidad);
        
        this.setState({
            productos
        }, () => {
            this.actualizarTotal()
        });
    }

    eliminarProducto = (id) => {
        const productos = this.state.productos;
        const productosRestantes = productos.filter(producto => producto.id !== id)

        this.setState({
            productos: productosRestantes,
        }, () => {
            this.actualizarTotal()
        });
    }

    render() {
        const mensaje = (this.state.total < 0) ? <Error mensaje="Las cantidades no pueden ser negativas" /> : null;

        return (
            <>
                <h3 className="text-center mb-2">Seleccionar productos</h3>
                {mensaje}

                <Select
                    onChange={this.seleccionarProducto}
                    options={this.props.productos}
                    isMulti={true}
                    components={Animated()}
                    placeholder={'Seleccionar productos'}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.nombre}
                    value={this.state.productos}
                />
                <Resumen 
                    productos={this.state.productos}
                    actualizarCantidad={this.actualizarCantidad}
                    eliminarProducto={this.eliminarProducto}
                />
                <p className="font-weight-bold float-right mt-3">
                    Total: &nbsp;
                    <span className="font-weight-normal">
                        $ {this.state.total}
                    </span> 
                </p>

                <GenerarPedido 
                    productos={this.state.productos}
                    total={this.state.total}
                    idCliente={this.props.id}
                    idVendedor={this.props.idVendedor}
                />
            </>
        );
    }
}

export default ContenidoPedido;