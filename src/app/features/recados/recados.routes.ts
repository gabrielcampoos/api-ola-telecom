import { Router } from "express";
import { RecadosController } from "./controllers/recados.controller";

// const recadosRoutes = express.Router();

// routerRecados.post("/recados", RecadosController.criar);

// routerRecados.get("/recados", RecadosController.listarTodos);

// routerRecados.put("/:idRecado", RecadosController.editar);

// routerRecados.delete("/:idRecado", RecadosController.deletar);

// export default routerRecados;

export default () => {
  const router = Router();

  router.post(
    "/recados",

    RecadosController.criar
  );
  router.get(
    "/recados",

    RecadosController.listarTodos
  );
  router.put("/:idRecado", RecadosController.editar);
  router.delete(
    "/:idRecado",

    RecadosController.deletar
  );

  return router;
};
