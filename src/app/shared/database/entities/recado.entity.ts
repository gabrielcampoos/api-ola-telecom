import { randomUUID } from "crypto";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { UsuarioEntity } from "./usuario.entity";

@Entity({ name: "recados" })
export class RecadoEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column()
  titulo!: string;

  @Column()
  recado!: string;

  @Column()
  criado_por!: string;

  @Column()
  criado_em!: Date;

  @Column()
  arquivado!: boolean;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.recados)
  @JoinColumn({
    name: "criado_por",
    foreignKeyConstraintName: "fk_recados_criado_por",
    referencedColumnName: "email",
  })
  usuario!: UsuarioEntity;

  @BeforeInsert()
  beforeInsert() {
    // o que deve ser feito antes de inserir um novo registro de transação
    this.id = randomUUID();
    this.criado_em = new Date();
  }
}
