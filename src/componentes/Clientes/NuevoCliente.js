import React, { Component } from 'react';

import { NUEVO_CLIENTE } from '../../mutations';
import { Mutation } from 'react-apollo';

class NuevoCliente extends Component {
    state = {
        cliente: {
            nombre: '',
            apellido: '',
            empresa: '',
            edad: '',
            tipo: ''
        },
        error: false,
        emails: []
    }

    nuevoCampo = () => {
        this.setState({
            emails: this.state.emails.concat([{email: ''}])
        });
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
        });
    }

    render() {
        const {error} = this.state;
        let respuesta = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p> : '';

        return (
            <>
                <h2 className="text-center">Nuevo cliente</h2>

                {respuesta}

                <div className="row justify-content-center">
                    <Mutation
                        mutation={NUEVO_CLIENTE}
                        onCompleted={() => {
                            this.props.history.push('/clientes');
                        }}
                    >
                        { crearCliente => (
                            <form className="col-md-8 m-3" onSubmit={(e) => {
                                e.preventDefault();

                                const {nombre, apellido, empresa, edad, tipo} = this.state.cliente; // acá busco en el state.cliente los elementos "nombre", "apellido", "empresa", "edad" y "tipo"

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
                                    nombre: nombre,
                                    apellido: apellido,
                                    empresa: empresa,
                                    edad: Number(edad),
                                    tipo: tipo,
                                    emails: emails
                                }

                                crearCliente({
                                    variables: {formulario}
                                })
                            }}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Nombre</label>
                                        <input type="text" className="form-control" placeholder="Nombre" onChange={(e) => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    nombre: e.target.value
                                                }
                                            })
                                        }} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Apellido</label>
                                        <input type="text" className="form-control" placeholder="Apellido" onChange={(e) => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    apellido: e.target.value
                                                }
                                            })
                                        }}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label>Empresa</label>
                                        <input type="text" className="form-control" placeholder="Empresa" onChange={(e) => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    empresa: e.target.value
                                                }
                                            })
                                        }}/>
                                    </div>
                                    {this.state.emails.map((input, index) => (
                                        <div key={index} className="form-group col-md-12">
                                            <label>Email {index + 1}</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder={`Email ${index + 1}`} value={input.email} onChange={this.leerCampo(index)}/>
                                                <div className="input-group-append">
                                                    <button type="button" className="btn btn-danger" onClick={this.eliminarCampo(index)}>
                                                        &times; Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="form-group d-flex justify-content-center col-md-12">
                                        <button type="button" className="btn btn-warning" onClick={this.nuevoCampo}>
                                            Agregar email
                                        </button>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Edad</label>
                                        <input type="text" className="form-control" placeholder="Edad" onChange={(e) => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    edad: e.target.value
                                                }
                                            })
                                        }}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Tipo Cliente</label>
                                        <select className="form-control" onChange={(e) => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    tipo: e.target.value
                                                }
                                            })
                                        }}>
                                            <option value="">Elegir...</option>
                                            <option value="BASICO">BASICO</option>
                                            <option value="PREMIUM">PREMIUM</option>
                                            <option value="VVIP">VVIP</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success float-right">Guardar</button>
                            </form>
                        ) }
                    </Mutation>
                </div>
            </>
        );
    }
}

export default NuevoCliente;