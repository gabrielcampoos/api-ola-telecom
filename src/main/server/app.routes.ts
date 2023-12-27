import { Express } from "express";
import osRoutes from "../../app/features/os/os.routes";
import usuariosRoutes from "../../app/features/usuarios/usuarios.routes";

export const makeRoutes = (app: Express) => {
  app.use(usuariosRoutes(), osRoutes());
};
