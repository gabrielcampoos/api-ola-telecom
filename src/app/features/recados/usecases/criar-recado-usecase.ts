import { RecadoJSON } from "../../../models";
import { RecadoRepository } from "../repositories/recados.repository";

export type RetornoCriarRecado = {
  sucesso: boolean;
  mensagem: string;
  dados?: RecadoJSON;
};

export interface CriarRecadoDTO {
  titulo?: string;
  recado?: string;
  criado_por: string;
}

export class CriarRecado {
  public async execute(
    dadosNovoRecado: CriarRecadoDTO
  ): Promise<RetornoCriarRecado> {
    const repository = new RecadoRepository();

    // 1 - verifica se existe um outro usuario com o mesmo email já cadastrado
    const existe = await repository.usuarioExiste(dadosNovoRecado.criado_por);
    if (!existe) {
      return {
        sucesso: false,
        mensagem: "Usuário não cadastrado.",
      };
    }

    // 2 - criar o novo recado
    const retorno = await repository.criarRecado(dadosNovoRecado);

    if (!retorno) {
      return {
        sucesso: false,
        mensagem: "Recado não foi criado.",
      };
    }

    return {
      sucesso: true,
      mensagem: "Recado criado com sucesso!",
      dados: retorno.toJSON(),
    };
  }
}
