// import { UsuariosRepository } from "../../usuarios/repositories";
// import { RecadoRepository } from "../repositories/recados.repository";
// import { RetornoCriarRecado } from "./criar-recado-usecase";

import { CacheRepository } from "../../../shared/database/repositories";
import { UsuariosRepository } from "../../usuarios/repositories";
import { RecadoRepository } from "../repositories/recados.repository";
import { RetornoCriarRecado } from "./criar-recado-usecase";

type AtualizarRecadoDTO = {
  email: string;
  idRecado: string;
  novosDados: {
    titulo?: string;
    recado?: string;
    arquivado: boolean;
    criado_em: Date;
  };
};

// export class AtualizarRecado {
//   public async execute(dados: AtualizarRecadoDTO): Promise<RetornoCriarRecado> {
//     const { idUsuario, idRecado, novosDados } = dados;

//     const repositoryUsuario = new UsuariosRepository();
//     const repositoryRecado = new RecadoRepository();

//     const usuarioEncontrado = await repositoryUsuario.buscaUsuarioPorID(
//       idUsuario
//     );

//     if (!usuarioEncontrado) {
//       return {
//         sucesso: false,
//         mensagem:
//           "Usuário não encontrado. Não foi possível atualizar o recado.",
//       };
//     }

//     const recadoBuscado = await repositoryRecado.recadoExiste(
//       idUsuario,
//       idRecado
//     );

//     if (!recadoBuscado) {
//       return {
//         sucesso: false,
//         mensagem: "Recado não encontrado.",
//       };
//     }

//     const atualizada = await repositoryRecado.editarRecado({
//       id: idRecado,
//       arquivado: false,
//       titulo: "",
//       recado: "",
//       criadoPor: "",
//     });

//     if (!atualizada) {
//       return {
//         sucesso: false,
//         mensagem: "Recado não foi atualizado.",
//       };
//     }

//     return {
//       sucesso: true,
//       mensagem: "Recado atualizado com sucesso.",
//       dados: atualizada.dados,
//     };
//   }
// }

const PREFIX_CACHE = "alterar-vaga";

export class EditarRecado {
  public async execute(dados: AtualizarRecadoDTO): Promise<RetornoCriarRecado> {
    const { idRecado, email, novosDados } = dados;

    const repositoryUsuario = new UsuariosRepository();
    const repositoryRecado = new RecadoRepository();
    const cacheRepository = new CacheRepository();

    const usuarioEncontrado = await repositoryUsuario.buscaUsuarioPorEmail(
      email
    );

    if (!usuarioEncontrado) {
      return {
        sucesso: false,
        mensagem: "Usuário não encontrado.",
      };
    }

    const recado = await repositoryRecado.recadoExiste(email, idRecado);

    if (!recado) {
      return {
        sucesso: false,
        mensagem: "Recado não encontrado.",
      };
    }

    const atualizado = recado.atualizarRecado({
      titulo: novosDados.titulo,
      recado: novosDados.recado,
      criado_em: novosDados.criado_em,
    });

    await cacheRepository.delete(`recados-usuario-${email}`);
    await cacheRepository.delete(`recado-${idRecado}`);

    if (!atualizado) {
      return {
        sucesso: false,
        mensagem: "Recado não pode ser atualizado",
      };
    }

    const recadoJSON = recado.toJSON();

    repositoryRecado.editarRecado({
      idRecado,
      titulo: recadoJSON.titulo,
      recado: recadoJSON.recado,
      arquivado: dados.novosDados.arquivado,
    });

    return {
      sucesso: true,
      mensagem: "Recado editado com sucesso.",
      dados: recadoJSON,
    };
  }
}
