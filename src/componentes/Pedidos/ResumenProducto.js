import React from "react";

const ResumenProducto = ({ cantidad, producto }) => {
    return (
        <>
            <div className="border border-dark mb-4 p-4">
                <p className="card-text font-weight-bold">
                    Nombre:&nbsp;
                    <span className="font-weight-normal">
                        {producto.nombre}
                    </span>
                </p>
                <p className="card-text font-weight-bold">
                    Precio unitario:&nbsp;
                    <span className="font-weight-normal">
                        $ {producto.precio}
                    </span>
                </p>
                <p className="card-text font-weight-bold">
                    Cantidad:&nbsp;
                    <span className="font-weight-normal">
                        {cantidad}
                    </span>
                </p>
            </div>
        </>
    )
}

export default ResumenProducto;