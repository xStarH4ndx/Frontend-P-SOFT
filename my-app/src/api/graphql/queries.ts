import { gql } from '@apollo/client';

export const LISTAR_USUARIOS = gql`
  query listarUsuarios {
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

export const OBTENER_SERVICIO = gql`
  query ObtenerServicio($servicioId: Int!) {
    obtenerServicio(servicioId: $servicioId) {
      id
      nombre
      costo
      direccion
      coordenadasEmisorX
      coordenadasEmisorY
      coordenadasReceptorX
      coordenadasReceptorY
      fotos
      categorias
      comentarios {
        id
        comentario
        usuario {
          id
          firstname
          lastname
        }
      }
      evaluaciones {
        id
        puntuacion
        usuario {
          id
          firstname
          lastname
        }
      }
      autor {
        id
        firstname
        lastname
      }
      fechaInicio
      fechaFin
    }
  }
`;

export const OBTENER_USUARIO = gql`
  query obtenerUsuario($id: Int!) {
    obtenerUsuario(id: $id) {
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

export const LISTAR_SERVICIO_POR_ID = gql`
  query listarServicioPorId($id: Int!) {
    listarServicioPorId(servicioId: $id) {
      id
      nombre
      costo
      direccion
    }
  }
`;

export const LISTAR_SERVICIOS = gql`
  query listarServicios {
    listarServicios {
      id
      nombre
      autor {
        firstname
        lastname
      }
      costo
      direccion
      evaluaciones {
        id
        puntuacion
      }
      comentarios {
        id
        comentario
        usuario {
          firstname
        }
      }
    }
  }
`;

export const LISTAR_SERVICIOS_POR_USUARIO = gql`
  query listarServiciosPorUsuario($usuarioId: Int!) {
    listarServiciosPorUsuario(usuarioId: $usuarioId) {
      id
      nombre
      costo
      direccion
    }
  }
`;

export const VENTAS_TOTALES_POR_USUARIO = gql`
  query ventasTotalesPorUsuario($usuarioId: Int!) {
    ventasTotalesPorUsuario(usuarioId: $usuarioId)
  }
`;

export const VENTAS_POR_FECHA = gql`
  query ventasPorFecha($usuarioId: Int!, $fechaInicio: String!, $fechaFin: String!) {
    ventasPorFecha(usuarioId: $usuarioId, fechaInicio: $fechaInicio, fechaFin: $fechaFin)
  }
`;

export const TOP_CINCO_SERVICIOS = gql`
  query topCincoServicios($usuarioId: Int!) {
    topCincoServicios(usuarioId: $usuarioId) {
      id
      nombre
      costo
      direccion
    }
  }
`;

export const ACCEDER_QUERY = gql`
  query acceder($username: String!, $password: String!) {
    acceder(username: $username, password: $password) {
      access_token
      refresh_token
    }
  }
`;
