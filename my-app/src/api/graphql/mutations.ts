import { gql } from '@apollo/client';

export const EVALUAR_SERVICIO = gql`
  mutation EvaluarServicio($servicioId: Int!, $usuarioId: Int!, $puntuacion: Int!) {
    evaluarServicio(servicioId: $servicioId, usuarioId: $usuarioId, puntuacion: $puntuacion) {
      id
      puntuacion
    }
  }
`;

export const COMENTAR_SERVICIO = gql`
  mutation ComentarServicio($comentario: String!, $servicioId: Int!, $usuarioId: Int!) {
    comentarServicio(comentario: $comentario, servicioId: $servicioId, usuarioId: $usuarioId) {
      id
      comentario
      usuario {
        firstname
      }
    }
  }
`;

export const CREAR_USUARIO = gql`
  mutation crearUsuario($usuarioDTO: UsuarioDTO!) {
    crearUsuario(usuarioDTO: $usuarioDTO) {
      id
      firstname
      lastname
      username
      telephone
      accountLocked
      enabled
      roles {
        id
        name
      }
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const UPDATE_PASSWORD_BY_CODE = gql`
  mutation updatePasswordByCode($code: String!, $password: String!) {
    updatePasswordByCode(code: $code, password: $password)
  }
`;

export const CREAR_SERVICIO = gql`
  mutation crearServicio($servicioDTO: ServicioDTO!) {
    crearServicio(servicioDTO: $servicioDTO) {
      id
      nombre
      costo
      direccion
    }
  }
`;

export const ACTUALIZAR_SERVICIO = gql`
  mutation actualizarServicio($servicioDTO: ServicioDTO!) {
    actualizarServicio(servicioDTO: $servicioDTO) {
      id
      nombre
      costo
      direccion
    }
  }
`;

export const ELIMINAR_SERVICIO = gql`
  mutation eliminarServicio($servicioId: Int!) {
    eliminarServicio(servicioId: $servicioId) {
      id
      nombre
      costo
      direccion
    }
  }
`;

export const EDITAR_USUARIO = gql`
  mutation editarUsuario($usuarioDTO: UsuarioDTO!) {
    editarUsuario(usuarioDTO: $usuarioDTO) {
      id
      firstname
      lastname
      username
      telephone
      roles {
        id
        name
      }
    }
  }
`;
