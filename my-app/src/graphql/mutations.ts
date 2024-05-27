// src/graphql/mutations.ts
import { gql } from '@apollo/client';

export const ADD_NEW_USER = gql`
  mutation AddNewUser($usuario: UsuarioInput!) {
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

export const CREAR_USUARIO = gql`
  mutation CrearUsuario($usuario: UsuarioInput!) {
    crearUsuario(usuario: $usuario) {
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
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const UPDATE_PASSWORD_BY_CODE = gql`
  mutation UpdatePasswordByCode($code: String!, $password: String!) {
    updatePasswordByCode(code: $code, password: $password)
  }
`;

// para el login
// src/graphql/mutations.ts

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        firstname
        lastname
      }
    }
  }
`;

