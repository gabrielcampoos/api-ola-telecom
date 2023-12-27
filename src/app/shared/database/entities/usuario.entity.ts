import { randomUUID } from "crypto";
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { RecadoEntity } from "./recado.entity";

// PADRÃO => active records
// @Entity({ name: 'usuarios' })
// export class UsuarioEntity extends BaseEntity {
// 	@PrimaryColumn()
// 	id!: string;

// 	@Column({ unique: true, type: 'varchar', length: 150 })
// 	email!: string;

// 	@Column({ type: 'varchar', length: 255 })
// 	senha!: string;

// 	@Column({ name: 'criadoem' })
// 	criadoEm!: Date;

// 	@BeforeInsert()
// 	beforeInsert() {
// 		// this.id = randomUUID();
// 		this.criadoEm = new Date();
// 	}
// }

@Entity({ name: "usuarios" })
export class UsuarioEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  email!: string;

  @Column()
  nome!: string;

  @Column()
  senha!: string;

  @OneToMany(() => RecadoEntity, (recado) => recado.usuario)
  recados!: RecadoEntity[];

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
  }
}
