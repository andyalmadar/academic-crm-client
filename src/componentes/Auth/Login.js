import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { AUTENTICAR_USUARIO } from '../../mutations';

import Error from '../Alertas/Error';

const initialState = {
    usuario: "",
    password: ""
}

class Login extends Component {
    state = {
        ...initialState
    };

    actualizarState = e => {
        const { name, value } = e.target;
        
        this.setState(state => ({
            ...state,
            [name]: value
        }));
    };

    limpiarState = () => {
        this.setState({
            ...initialState
        });
    };

    iniciarSesion = (e, usuarioAutenticar) => {
        e.preventDefault();

        // Acá se llama a lo que está en mutations.js
        usuarioAutenticar().then(async ({ data }) => {
            localStorage.setItem('token', data.autenticarUsuario.token);

            await this.props.refetch();

            this.limpiarState();

            setTimeout(() => {
                this.props.history.push('/panel');
            }, 1000);
        });
    };

    validarForm = () => {
        const { usuario, password } = this.state;

        return !(
            usuario
        ) || !(
            password
        );
    };

    render() { 
        const { usuario, password } = this.state;

        return ( 
            <>
                <h2 className="text-center mb-5">Iniciar sesión</h2>
                <div className="row justify-content-center">
                    <Mutation
                        mutation={AUTENTICAR_USUARIO}
                        variables={{usuario, password}}
                    >
                        {
                            (usuarioAutenticar, { loading, error, data }) => {
                                return (
                                    <form
                                        onSubmit={e => this.iniciarSesion(e, usuarioAutenticar)}
                                        className="col-md-8"
                                    >
                                        {
                                            error && <Error mensaje={error.message} />
                                        }
                                        <div className="form-group">
                                            <label>Usuario</label>
                                            <input 
                                                className="form-control"
                                                type="text"
                                                name="usuario"
                                                placeholder="Nombre de usuario"
                                                onChange={this.actualizarState}
                                                value={usuario}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input 
                                                className="form-control"
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                onChange={this.actualizarState}
                                                value={password}
                                            />
                                        </div>
                                        <button
                                            disabled={loading || this.validarForm()}
                                            type="submit"
                                            className="btn btn-success float-right"
                                        >
                                            Iniciar sesión
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
 
export default withRouter(Login);