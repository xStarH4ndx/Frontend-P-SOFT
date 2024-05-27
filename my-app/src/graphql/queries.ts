import { gql } from '@apollo/client';

export const LISTAR_USUARIOS = gql`
  query ListarUsuarios {
    listarUsuarios {
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

export const LISTAR_USUARIO_POR_ID = gql`
  query ListarUsuarioPorId($id: Int!) {
    listarUsuarioPorId(id: $id) {
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

export const USUARIO = gql`
  query Usuario($id: Int!) {
    usuario(id: $id) {
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
