import React, { Component } from 'react'

class Paginador extends Component {
    state = {
        paginador: {
            paginas: Number(Math.ceil(this.props.total / this.props.limite))
        }
    }

    render() {
        const {pagina} = this.props;
        const btnAnterior = (pagina > 1) ? <button onClick={this.props.paginaAnterior} type="button" className="btn btn-success mr-2">&laquo; Anterior</button> : "";

        const {paginas} = this.state.paginador;
        const btnSiguiente = (pagina !== paginas) ? <button onClick={this.props.paginaSiguiente} type="button" className="btn btn-success">Siguiente &raquo;</button> : "";

        return (
            <div className="mt-5 d-flex justify-content-center">
                {btnAnterior}
                {btnSiguiente}
            </div>
        );
    }
}

export default Paginador;