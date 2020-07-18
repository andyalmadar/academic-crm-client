import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const cerrarSesionUsuario = (apolloClient, history) => {
    localStorage.removeItem('token', '');
    apolloClient.resetStore();
    history.push('/login');
};

const CerrarSesion = ({ history }) => (
    <ApolloConsumer>
        {
            apolloClient => {
                return (
                    <button
                    onClick={() => cerrarSesionUsuario(apolloClient, history)}
                    className="btn btn-light ml-md-2 mt-2 mt-md-0"
                >
                    Cerrar sesión
                </button>
                );
            }
        }
    </ApolloConsumer>
);
 
export default withRouter(CerrarSesion);