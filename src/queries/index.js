import gql from "graphql-tag";

export const CLIENTES_QUERY = gql`
	query getClientes($limite: Int, $offset: Int) {
		getClientes(limite: $limite, offset: $offset) {
			id
			nombre
			apellido
			empresa
		}

		totalClientes
	}
`;

export const CLIENTE_QUERY = gql`
	query ConsultarCliente($id: ID) {
		getCliente(id: $id) {
			id
			nombre
			apellido
			empresa
			edad
			tipo
			emails {
				email
			}
		}
	}
`;

export const PRODUCTOS_QUERY = gql`
	query getProductos($limite: Int, $offset: Int, $hideSoldOut: Boolean) {
		getProductos(limite: $limite, offset: $offset, hideSoldOut: $hideSoldOut) {
			id
			nombre
			precio
			stock
		}

		totalProductos
	}
`;

export const PRODUCTO_QUERY = gql`
	query ConsultarProducto($id: ID) {
		getProducto(id: $id) {
			id
			nombre
			precio
			stock
		}
	}
`;

export const PEDIDOS_QUERY = gql`
	query getPedidos($cliente: String) {
		getPedidos(cliente: $cliente) {
			id
			total
			fecha
			cliente
			pedido {
				id
				cantidad
			}
			estado
		}
	}
`;
