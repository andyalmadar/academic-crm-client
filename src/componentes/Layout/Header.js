import React from 'react';
import { Link } from 'react-router-dom';

import CerrarSesion from './CerrarSesion';
import BotonRegistro from './BotonRegistro';

const Header = ({ session }) => {
    const menuFinal = session.getUsuario ? <NavAutenticado session={session} /> : <NavNoAutenticado />;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
            <div className="container">
                {menuFinal}
            </div>
        </nav>
    )
};

const NavNoAutenticado = () => (
    <h4 to="/" className="navbar-brand text-light font-weight-bold">
        CRM de handy
    </h4>
)

const NavAutenticado = ({ session }) => (
    <>
        <Link to="/" className="navbar-brand text-light font-weight-bold">
            CRM de handy
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navegacion">
            <ul className="navbar-nav ml-auto text-right">
                <li className="nav-item dropdown mr-lg-2 mb-2 mb-lg-0">
                    <button
                        className="nav-link dropdown-toggle btn btn-block btn-success"
                        data-toggle="dropdown"
                    >
                        Clientes
                    </button>
                    <div className="dropdown-menu" aria-labelledby="navegacion">
                        <Link to="/clientes" className="dropdown-item">
                            Ver clientes
                        </Link>
                        <Link to="/cliente/nuevo" className="dropdown-item">
                            Nuevo cliente
                        </Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <button
                        className="nav-link dropdown-toggle btn btn-block btn-success"
                        data-toggle="dropdown"
                    >
                        Productos
                    </button>
                    <div className="dropdown-menu" aria-labelledby="navegacion">
                        <Link to="/productos" className="dropdown-item">
                            Ver productos
                        </Link>
                        <Link to="/producto/nuevo" className="dropdown-item">
                            Nuevo producto
                        </Link>
                    </div>
                </li>
                <BotonRegistro session={session} />
                <CerrarSesion />
            </ul>
        </div>
    </>
)

export default Header;