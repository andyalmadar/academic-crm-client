import gql from "graphql-tag";

// CLIENTES

export const NUEVO_CLIENTE = gql`
	mutation crearCliente($formulario: ClienteInput) {
		crearCliente(formulario: $formulario) {
			id
			nombre
			apellido
		}
	}
`;

export const ACTUALIZAR_CLIENTE = gql`
	mutation actualizarCliente($formulario: ClienteInput) {
		actualizarCliente(formulario: $formulario) {
			id
			nombre
			apellido
			edad
			empresa
			tipo
			emails {
				email
			}
		}
	}
`;

export const ELIMINAR_CLIENTE = gql`
	mutation eliminarCliente($id: ID!) {
		eliminarCliente(id: $id)
	}
`;

// PRODUCTOS

export const NUEVO_PRODUCTO = gql`
	mutation crearProducto($formulario: ProductoInput) {
		crearProducto(formulario: $formulario) {
			id
			nombre
			precio
			stock
		}
	}
`;

export const ELIMINAR_PRODUCTO = gql`
	mutation eliminarProducto($id: ID!) {
		eliminarProducto(id: $id)
	}
`;

export const ACTUALIZAR_PRODUCTO = gql`
	mutation actualizarProducto($formulario: ProductoInput) {
		actualizarProducto(formulario: $formulario) {
			id
			nombre
			precio
			stock
		}
	}
`;

// PEDIDOS

export const NUEVO_PEDIDO = gql`
	mutation crearPedido($formulario: PedidoInput) {
		crearPedido(formulario: $formulario) {
			id
		}
	}
`;

export const ACTUALIZAR_PEDIDO = gql`
	mutation actualizarPedido($formulario: PedidoInput, $estadoAnterior: String) {
		actualizarPedido(formulario: $formulario, estadoAnterior: $estadoAnterior)
	}
`;

// USUARIOS

export const NUEVO_USUARIO = gql`
	mutation crearUsuario($usuario: String!, $password: String!) {
		crearUsuario(usuario: $usuario, password: $password)
	}
`;

// El autenticarUsuario interno se refiere al que está en resolvers.js (en server)
export const AUTENTICAR_USUARIO = gql`
	mutation autenticarUsuario($usuario: String!, $password: String!) {
		autenticarUsuario(usuario: $usuario, password: $password) {
			token
		}
	}
`;
