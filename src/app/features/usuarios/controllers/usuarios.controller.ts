import { Request, Response } from "express";
import { CadastrarUsuario, LogarUsuario } from "../usecases";

export class UsuariosController {
  public static async cadastrar(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    try {
      const usecase = new CadastrarUsuario();

      const resultado = await usecase.execute({ nome, email, senha });

      if (!resultado.sucesso) return res.status(401).json(resultado);

      return res.status(200).json(resultado);
    } catch (erro: any) {
      return res.status(500).json(erro.toString());
    }
  }

  public static async logar(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    try {
      const usecase = new LogarUsuario();

      const resultado = await usecase.execute({ nome, email, senha });

      if (!resultado.sucesso) return res.status(401).json(resultado);

      return res.status(200).json(resultado);
    } catch (erro: any) {
      return res.status(500).json(erro.toString());
    }
  }
}
