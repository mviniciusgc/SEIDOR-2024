import Drive from '../../../db/entity/drive'
import { IDriveRepository } from '../interface/IDriveRepository'
import {AppDataSource} from '../../../db/conection/data-source'

const driveRepository = AppDataSource.getRepository(Drive)

class DriveRepository implements IDriveRepository {

    public async create(data: Drive): Promise<Drive> {
        return driveRepository.save(data)
    }

    public async find(whereConditions: any): Promise<Drive[]> {
        return driveRepository.find({
            where: whereConditions
        })
    }

    public async findOne(id: number): Promise<Drive | null> {
        return driveRepository.findOne({
            where: {
                id: id
            }
        })
    }
    public async update(data: Drive): Promise<Drive> {
        return driveRepository.save({id: Number(data.id), ...data})
    }
    public async delete(id: number): Promise<void> {
        driveRepository.delete(id)
    }
}

export { DriveRepository }