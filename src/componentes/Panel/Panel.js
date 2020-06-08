import React from 'react';

import Clientes from './Clientes';

const Panel = () => {
    return (
        <>
            <h2 className="text-center my-5">Los 10 más compradores (importe total)</h2>
            <Clientes />
        </>
    )
};

export default Panel;