import { gql } from '@apollo/client';

// Define and export the LOGIN mutation
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        firstname
        lastname
        username
        roles {
          id
          name
        }
      }
    }
  }
`;

// Añadir nuevo usuario
export const ADD_NEW_USER = gql`
  mutation addNewUser($usuario: UsuarioInput!) {
    addNewUser(usuario: $usuario) {
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

// Olvidar contraseña
export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

// Actualizar contraseña por código
export const UPDATE_PASSWORD_BY_CODE = gql`
  mutation updatePasswordByCode($code: String!, $password: String!) {
    updatePasswordByCode(code: $code, password: $password)
  }
`;

// Crear servicio
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

// Actualizar servicio
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

// Eliminar servicio
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

// Evaluar servicio
export const EVALUAR_SERVICIO = gql`
  mutation evaluarServicio($servicioId: Int!, $usuarioId: Int!, $evaluacionDTO: EvaluacionDTO!) {
    evaluarServicio(servicioId: $servicioId, usuarioId: $usuarioId, evaluacionDTO: $evaluacionDTO) {
      id
      nombre
      costo
      direccion
    }
  }
`;
