import React, { Component } from 'react'

import { ACTUALIZAR_CLIENTE } from '../../mutations'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

class FormularioEditarCliente extends Component {
    state = {
        cliente: this.props.cliente,
        emails: this.props.cliente.emails
    }

    nuevoCampo = () => {
        this.setState({
            emails: this.state.emails.concat([{email: ''}])
        })
    }

    leerCampo = (indexEmail) => (e) => {
        this.setState({
            emails: this.state.emails.map((email, index) => (
                indexEmail === index ? {email: e.target.value} : email
            ))
        })
    }

    eliminarCampo = (indexEmail) => () => {
        this.setState({
            emails: this.state.emails.filter((email, index) => (
                indexEmail !== index
            ))
        })
    }

    render () {
        const {nombre, apellido, empresa, edad, tipo} = this.state.cliente

        return (
            <Mutation mutation={ACTUALIZAR_CLIENTE} onCompleted={() => {
                this.props.refetch().then(() => {
                    this.props.history.push('/clientes');
                });
            }}>
                {actualizarCliente => (
                    <form className="col-md-8 m-3" onSubmit={(e) => {
                        e.preventDefault();

                        const {id, nombre, apellido, empresa, edad, tipo} = this.state.cliente; // acá busco en el state.cliente los elementos "id", "nombre", "apellido", "empresa", "edad" y "tipo"

                        const {emails} = this.state // acá busco en el state el elemento "emails"

                        if (nombre === '' || apellido === '' || empresa === '' || edad === '' || tipo === '') {
                            this.setState({
                                error: true
                            });

                            return;
                        }

                        this.setState({
                            error: false
                        });

                        const formulario = {
                            id: id,
                            nombre: nombre,
                            apellido: apellido,
                            empresa: empresa,
                            edad: Number(edad),
                            tipo: tipo,
                            emails: emails
                        }

                        actualizarCliente({
                            variables: {formulario}
                        })
                    }}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Nombre</label> <input
                                type="text"
                                className="form-control"
                                value={nombre}
                                onChange={(e) => {
                                    this.setState({
                                        cliente: {
                                            ...this.state.cliente,
                                            nombre: e.target.value
                                        }
                                    })
                                }}
                            />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Apellido</label> <input
                                type="text"
                                className="form-control"
                                value={apellido}
                                onChange={(e) => {
                                    this.setState({
                                        cliente: {
                                            ...this.state.cliente,
                                            apellido: e.target.value
                                        }
                                    })
                                }}
                            />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label>Empresa</label> <input
                                type="text"
                                className="form-control"
                                value={empresa}
                                onChange={(e) => {
                                    this.setState({
                                        cliente: {
                                            ...this.state.cliente,
                                            empresa: e.target.value
                                        }
                                    })
                                }}
                            />
                            </div>

                            {this.state.emails.map((input, index) => (
                                <div key={index} className="form-group col-md-12">
                                    <label>Email {index + 1}</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            placeholder={`Email ${index + 1}`}
                                            className="form-control"
                                            onChange={this.leerCampo(index)}
                                            value={input.email}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={this.eliminarCampo(index)}>
                                                &times; Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="form-group d-flex justify-content-center col-md-12">
                                <button
                                    onClick={this.nuevoCampo}
                                    type="button"
                                    className="btn btn-warning"
                                >+ Agregar Email
                                </button>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Edad</label> <input
                                type="text"
                                className="form-control"
                                value={edad}
                                onChange={(e) => {
                                    this.setState({
                                        cliente: {
                                            ...this.state.cliente,
                                            edad: e.target.value
                                        }
                                    })
                                }}
                            />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Tipo Cliente</label> <select
                                className="form-control"
                                value={tipo}
                                onChange={(e) => {
                                    this.setState({
                                        cliente: {
                                            ...this.state.cliente,
                                            tipo: e.target.value
                                        }
                                    })
                                }}
                            >
                                <option value="">Elegir...</option>
                                <option value="BASICO">BASICO</option>
                                <option value="PREMIUM">PREMIUM</option>
                                <option value="VVIP">VVIP</option>
                            </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                    </form>
                )}
            </Mutation>
        )
    }
}

export default withRouter(FormularioEditarCliente)