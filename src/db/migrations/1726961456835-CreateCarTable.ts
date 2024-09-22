import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarTable1726961456835 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'car',
                columns: [
                    {
                        name:'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'placa',
                        type: 'varchar',
                        length: '100',
                        isNullable:false
                    },
                    {
                        name: 'cor',
                        type: 'varchar',
                        length: '100',
                        isNullable:false
                    },
                    {
                        name: 'marca',
                        type: 'varchar',
                        length: '100',
                        isNullable:false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropDatabase('car')
    }

}
