import Drive from '../../../db/entity/drive'

interface IDriveRepository {
    create(data: Drive): Promise<Drive>;
    find(nome: string): Promise<Drive[]>;
    findOne(id: number): Promise<Drive | null>;
    delete(id: number): Promise<void>;
    update(data: Drive): Promise<Drive>;
}

export { IDriveRepository }