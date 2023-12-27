import { Request, Response } from "express";
import { CriarRecado, CriarRecadoDTO } from "../usecases/criar-recado-usecase";
import { EditarRecado } from "../usecases/editar-recado-usecase";
import { ExcluirRecado } from "../usecases/excluir-recado-usecase";
import { ListarRecados } from "../usecases/listar-recados-usecase";

export class RecadosController {
  public static async criar(req: Request, res: Response) {
    const recado: CriarRecadoDTO = req.body;

    try {
      const usecase = new CriarRecado();

      const resultado = await usecase.execute(recado);

      if (!resultado.sucesso) return undefined;

      return res.status(200).json(resultado);
    } catch (erro: any) {
      return res.status(500).json(erro.toString());
    }
  }

  public static async listarTodos(req: Request, res: Response) {
    try {
      const { idRecado } = req.body;

      const usecase = new ListarRecados();

      const resultado = await usecase.execute(idRecado);

      if (!resultado.sucesso) return res.status(404).json(resultado);

      return res.status(200).json(resultado);
    } catch (erro: any) {
      return res.status(500).json(erro.toString());
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const { idRecado } = req.params;

      const usecase = new ExcluirRecado();

      const resultado = await usecase.execute({ idRecado, email });

      if (!resultado.sucesso) return res.status(404).json(resultado);

      return res.status(200).json(resultado);
    } catch (erro: any) {
      return res.status(500).json(erro.toString());
    }
  }

  static async editar(req: Request, res: Response) {
    try {
      const { idRecado } = req.params;
      const { email, recado, titulo, arquivado, criado_em } = req.body;

      const usecase = new EditarRecado();
      const resultado = usecase.execute({
        idRecado,
        email,
        novosDados: { titulo, recado, arquivado, criado_em },
      });

      if (!resultado) {
        return res.status(404).json(resultado);
      }

      return res.status(200).json(resultado);
    } catch (erro: any) {
      return res.status(500).json(erro.toString());
    }
  }
}
