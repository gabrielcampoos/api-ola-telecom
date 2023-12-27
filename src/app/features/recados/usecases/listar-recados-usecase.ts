import { Recado, RecadoJSON } from "../../../models";
import { CacheRepository } from "../../../shared/database/repositories";
import { RecadoRepository } from "../repositories/recados.repository";

type RetornoListar = {
  sucesso: boolean;
  mensagem: string;
  dadosRetornados?: Recado[];
};

export class ListarRecados {
  async execute(email: string): Promise<RetornoListar> {
    const repositoryRecado = new RecadoRepository();
    const cacheRepository = new CacheRepository();

    const busca = await repositoryRecado.usuarioExiste(email);

    if (!busca) {
      return {
        sucesso: false,
        mensagem: "Usuário não cadastrado.",
      };
    }

    const recadosCache = await cacheRepository.get<RecadoJSON[]>(
      `recados-usuario-${email}`
    );
    let recados: RecadoJSON[] = [];

    if (!recadosCache) {
      const recadosPrincipal = await repositoryRecado.listarRecados(email);
      recados = recadosPrincipal.map((r) => r.toJSON());

      await cacheRepository.set<RecadoJSON[]>(
        `recados-usuario-${email}`,
        recados
      );
    } else {
      recados = recadosCache;
    }

    return {
      sucesso: true,
      mensagem: "Recados listados com sucesso.",
    };
  }

  async listarArquivados(email: string): Promise<RetornoListar> {
    const repository = new RecadoRepository();

    const busca = await repository.usuarioExiste(email);

    if (!busca) {
      return {
        sucesso: false,
        mensagem: "Usuário não cadastrado.",
      };
    }

    const dadosRetornados = await repository.listarArquivados(email);

    return {
      sucesso: true,
      mensagem: "Recados arquivados listados com sucesso.",
      dadosRetornados: dadosRetornados,
    };
  }
}
