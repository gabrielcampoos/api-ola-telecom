import { FindOptionsWhere } from "typeorm";
import { DatabaseConnection } from "../../../../main/database";
import { Recado } from "../../../models";
import { RecadoEntity, UsuarioEntity } from "../../../shared/database/entities";
import { CriarRecadoDTO } from "../usecases/criar-recado-usecase";

export type RetornoExcluir = {
  sucesso: boolean;
  mensagem: string;
  dadosRetornados?: string;
};

export type AtualizarDTO = {
  idRecado: string;
  titulo?: string;
  recado?: string;
  arquivado: boolean;
};

export class RecadoRepository {
  private _manager = DatabaseConnection.connection.manager;

  public async usuarioExiste(email: string): Promise<boolean> {
    const usuarioEncontrado = await this._manager.findOneBy(UsuarioEntity, {
      email,
    });

    return !!usuarioEncontrado;
  }

  public async recadoExiste(
    criado_por: string,
    idRecado: string
  ): Promise<Recado | undefined> {
    const recadoEncontrado = await this._manager.findOne(RecadoEntity, {
      where: { id: idRecado, criado_por },
      relations: { usuario: true },
    });

    if (!recadoEncontrado) return undefined;

    return this.entityToModel(recadoEncontrado);
  }

  public async criarRecado(dados: CriarRecadoDTO): Promise<Recado> {
    const { titulo, recado, criado_por } = dados;

    const novoRecado = this._manager.create(RecadoEntity, {
      criado_por,
      titulo,
      recado,
    });

    const recadoCriado = await this._manager.save(novoRecado);

    return this.entityToModel(recadoCriado);
  }

  public async listarRecados(email: string): Promise<Recado[]> {
    const clausula: FindOptionsWhere<RecadoEntity> = {
      criado_por: email,
      arquivado: false,
    };

    const recadosFiltrados = await this._manager.find(RecadoEntity, {
      where: clausula,
    });

    return recadosFiltrados.map((r) => this.entityToModel(r));
  }

  public async listarArquivados(email: string): Promise<Recado[]> {
    const clausula: FindOptionsWhere<RecadoEntity> = {
      criado_por: email,
      arquivado: true,
    };

    const recadosFiltrados = await this._manager.find(RecadoEntity, {
      where: clausula,
    });

    return recadosFiltrados.map((r) => this.entityToModel(r));
  }

  async editarRecado(dados: AtualizarDTO): Promise<void> {
    const { idRecado, titulo, recado, arquivado } = dados;

    await this._manager.update(
      RecadoEntity,
      { id: idRecado },
      { titulo, recado, arquivado }
    );
  }

  public async excluirRecado(idRecado: string): Promise<RetornoExcluir> {
    const recadoDelete = await this._manager.delete(RecadoEntity, {
      id: idRecado,
    });

    // const usuarios = await usuarioRepo.find(UsuarioEntity, {
    // 	where: {
    // 		email: ILike('leticia'),
    // 	},
    // });

    if (!recadoDelete.affected) {
      return {
        sucesso: false,
        mensagem: "Recado não encontrado.",
      };
    }

    return {
      sucesso: true,
      mensagem: "Recado excluído com sucesso.",
      dadosRetornados: idRecado,
    };
  }

  async clear() {
    await this._manager.delete(RecadoEntity, {});
  }

  // TRANSFORMA RESULTADO DA BUSCA EM UMA INSTANCIA DA MODEL
  private entityToModel(dadosDB: RecadoEntity): Recado {
    const recado = new Recado(
      dadosDB.id,
      dadosDB.criado_por,
      dadosDB.titulo,
      dadosDB.recado
    );

    return recado;
  }
}
