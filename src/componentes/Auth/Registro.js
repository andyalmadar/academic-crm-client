import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { NUEVO_USUARIO } from '../../mutations';
import { withRouter } from 'react-router-dom';

import Error from '../Alertas/Error';

const initialState = {
    usuario: "",
    password: "",
    repetirPassword: ""
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
        const { usuario, password, repetirPassword } = this.state;

        return !(
            password === repetirPassword
        ) || !(
            usuario
        ) || !(
            password
        ) || !(
            repetirPassword
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
        const { usuario, password, repetirPassword } = this.state;

        return (
            <>
                <h2 className="text-center mb-5">Nuevo usuario</h2>
                <div className="row justify-content-center">
                    <Mutation
                        mutation={NUEVO_USUARIO}
                        variables={{usuario, password}}
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
                                        </div>
                                        <div className="form-group">
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
                                        <div className="form-group">
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