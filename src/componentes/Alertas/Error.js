import React from "react";

const Error = ({ mensaje }) => {
    return (
        <p className="alert alert-danger p-2 mb-2 text-center">
            {mensaje}
        </p>
    );
}

export default Error;