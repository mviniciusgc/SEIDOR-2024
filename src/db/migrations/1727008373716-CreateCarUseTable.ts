import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCarUseTable1727008373716 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'car_use',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'dataInicio',
                        type: 'timestamp',
                    },
                    {
                        name: 'dataFim',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'motivo',
                        type: 'varchar',
                    },
                    {
                        name: 'driveId',
                        type: 'int',
                    },
                    {
                        name: 'carId',
                        type: 'int',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey('car_use', new TableForeignKey({
            columnNames: ['driveId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'drive',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('car_use', new TableForeignKey({
            columnNames: ['carId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'car',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('car_use');
        if (table) {
            const foreignKeys = table.foreignKeys;

            for (const fk of foreignKeys) {
                await queryRunner.dropForeignKey('car_use', fk);
            }
        }

        await queryRunner.dropTable('car_use');
    }

}
