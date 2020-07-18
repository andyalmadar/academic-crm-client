import React from 'react';

import Clientes from './Clientes';
import Vendedores from './Vendedores';

const Panel = () => {
    return (
        <>
            <h2 className="text-center my-5">Los 10 más compradores (importe total)</h2>
            <Clientes />
            <h2 className="text-center my-5">Los mejores 10 vendedores (importe total)</h2>
            <Vendedores />
        </>
    )
};

export default Panel;