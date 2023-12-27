import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableRecados1696215228441 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "recados",
        columns: [
          {
            name: "id",
            type: "uuid",
            isNullable: false,
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "titulo",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "recado",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "criado_por",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "criado_em",
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
          {
            name: "arquivado",
            type: "boolean",
            isNullable: false,
            default: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["criado_por"],
            referencedTableName: "usuarios",
            referencedColumnNames: ["email"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("recados", true, true, true);
  }
}
