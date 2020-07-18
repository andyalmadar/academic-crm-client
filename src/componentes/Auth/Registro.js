import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { NUEVO_USUARIO } from '../../mutations';
import { withRouter, Redirect } from 'react-router-dom';

import Error from '../Alertas/Error';

const initialState = {
    usuario: "",
    nombre: "",
    password: "",
    repetirPassword: "",
    rol: ""
}

class Registro extends Component {
    state = initialState;

    limpiarState = () => {
        this.setState({
            ...initialState
        })
    }

    actualizarState = e => {
        const { name, value } = e.target;

        this.setState(state => ({
            ...state,
            [name]: value
        }));
    };

    validarForm = () => {
        const { usuario, nombre, password, repetirPassword, rol } = this.state;

        return !(
            password === repetirPassword
        ) || !(
            usuario
        ) || !(
            nombre
        )|| !(
            password
        ) || !(
            repetirPassword
        ) || !(
            rol
        );
    };

    crearRegistro = (e, crearUsuario) => {
        e.preventDefault();
        
        crearUsuario().then(data => {
            this.limpiarState();
            this.props.history.push('/login');
        });
    };

    render() { 
        const { usuario, nombre, password, repetirPassword, rol } = this.state;

        const rolUsuario = this.props.session.getUsuario.rol;
        const redireccion = rolUsuario !== 'ADMINISTRADOR' ? <Redirect to="/clientes" /> : "";

        return (
            <>
                {redireccion}
                <h2 className="text-center mb-5">Nuevo usuario</h2>
                <div className="row justify-content-center">
                    <Mutation
                        mutation={NUEVO_USUARIO}
                        variables={{usuario, nombre, password, rol}}
                    >
                        {
                            (crearUsuario, { loading, error, data }) => {
                                console.log(error);
                                return (
                                    <form
                                        className="col-md-8"
                                        onSubmit={e => {this.crearRegistro(e, crearUsuario)}}
                                    >
                                        {
                                            error && (
                                                <Error mensaje={error.message} />
                                            )
                                        }
                                        <div className="form-group">
                                            <label>Usuario</label>
                                            <input
                                                type="text"
                                                name="usuario"
                                                className="form-control"
                                                placeholder="Nombre de usuario"
                                                onChange={this.actualizarState}
                                                value={usuario}
                                            />
                                            <small className="form-text text-muted">
                                                Sin espacios ni caracteres especiales
                                            </small>
                                        </div>
                                        <div className="form-group">
                                            <label>Nombre completo</label>
                                            <input
                                                type="text"
                                                name="nombre"
                                                className="form-control"
                                                placeholder="Nombre completo"
                                                onChange={this.actualizarState}
                                                value={nombre}
                                            />
                                            <small className="form-text text-muted">
                                                Aquí sí están permitidos los caracteres especiales
                                            </small>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    onChange={this.actualizarState}
                                                    value={password}
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Repetir la password</label>
                                                <input
                                                    type="password"
                                                    name="repetirPassword"
                                                    className="form-control"
                                                    placeholder="Repetir la password"
                                                    onChange={this.actualizarState}
                                                    value={repetirPassword}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Rol</label>
                                            <select
                                                className="form-control"
                                                value={rol}
                                                name="rol"
                                                onChange={this.actualizarState}
                                            >
                                                <option value="">Seleccionar...</option>
                                                <option value="ADMINISTRADOR">Administrador</option>
                                                <option value="VENDEDOR">Vendedor</option>
                                            </select>
                                        </div>
                                        
                                        <button
                                            disabled={loading || this.validarForm()}
                                            type="submit"
                                            className="btn btn-success float-right"
                                        >
                                            Crear usuario
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
 
export default withRouter(Registro);