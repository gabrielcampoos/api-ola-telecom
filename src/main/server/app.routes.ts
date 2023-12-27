import { Express } from "express";
import recadosRoutes from "../../app/features/recados/recados.routes";
import usuariosRoutes from "../../app/features/usuarios/usuarios.routes";

export const makeRoutes = (app: Express) => {
  app.use(usuariosRoutes(), recadosRoutes());
};
