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

export const LISTAR_USUARIO_POR_ID = gql`
  query listarUsuarioPorId($id: Int!) {
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

// Obtener servicio por ID
export const LISTAR_SERVICIO_POR_ID = gql`
  query listarServicioPorId($id: Int!) {
    listarServicioPorId(id: $id) {
      id
      nombre
      costo
      direccion
    }
  }
`;

// Obtener usuario por ID (renombrado)
export const USUARIO = gql`
  query usuario($id: Int!) {
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

// Obtener servicio por ID (renombrado)
export const OBTENER_SERVICIO = gql`
  query obtenerServicio($servicioId: Int!) {
    obtenerServicio(servicioId: $servicioId) {
      id
      nombre
      costo
      direccion
    }
  }
`;

// Listar todos los servicios
export const LISTAR_SERVICIOS = gql`
  query listarServicios {
    listarServicios {
      id
      nombre
      costo
      direccion
    }
  }
`;

// Listar servicios por usuario
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

// Obtener ventas totales por usuario
export const VENTAS_TOTALES_POR_USUARIO = gql`
  query ventasTotalesPorUsuario($usuarioId: Int!) {
    ventasTotalesPorUsuario(usuarioId: $usuarioId)
  }
`;

// Obtener ventas por fecha
export const VENTAS_POR_FECHA = gql`
  query ventasPorFecha($usuarioId: Int!, $fechaInicio: String!, $fechaFin: String!) {
    ventasPorFecha(usuarioId: $usuarioId, fechaInicio: $fechaInicio, fechaFin: $fechaFin)
  }
`;

// Top cinco servicios por usuario
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
