import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsuarios1696215126398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuarios",
        columns: [
          {
            name: "id",
            type: "uuid",
            isNullable: false,
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "email",
            type: "varchar",
            length: "150",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "nome",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "senha",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuarios", true, true, true);
  }
}
