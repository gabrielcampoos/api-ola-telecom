import { Router } from "express";
import { UsuariosController } from "./controllers";
import { validarDadosUsuario } from "./validators";

// const usuarioRoutes = express.Router();

// usuarioRoutes.post(
//   "/cadastro",
//   validarDadosUsuario,
//   UsuariosController.cadastrar
// );
// usuarioRoutes.post("/login", validarDadosUsuario, UsuariosController.logar);

// export default usuarioRoutes;

export default () => {
  const router = Router();

  router.post("/usuarios", validarDadosUsuario, UsuariosController.cadastrar);
  router.post("/login", validarDadosUsuario, UsuariosController.logar);

  return router;
};
