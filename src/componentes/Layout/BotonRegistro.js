import React from 'react';
import { Link } from 'react-router-dom';

const BotonRegistro = ({ session }) => {
    const { rol } = session.getUsuario;

    if (rol !== 'ADMINISTRADOR') {
        return null;
    }

    return (
        <Link to="/registro" className="btn btn-warning ml-md-2 mt-2 mt-md-0">
            Crear usuario
        </Link>
    );
}
 
export default BotonRegistro;