import { Base } from "./Base";

export type UsuarioJSON = {
  id: string;
  nome: string;
  email: string;
};

export class Usuario extends Base {
  constructor(
    _id: string,
    private _nome: string,
    private _email: string,
    private _senha: string
  ) {
    super(_id);
  }

  public toJSON(): UsuarioJSON {
    return {
      id: this._id,
      nome: this._nome,
      email: this._email,
    };
  }
}

/*

*/
