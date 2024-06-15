import * as yup from "yup";

export const LoginValidate = yup.object().shape({
    username: yup.string().trim().required("El correo es requerido"),
    password: yup.string().trim().required("El password es requerido"),
});