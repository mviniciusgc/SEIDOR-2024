import { injectable, inject } from "tsyringe";
import { IDriveRepository } from '../../Repository/interface/IDriveRepository'
import Drive from '../../../db/entity/drive'
import { ILike } from 'typeorm'

@injectable()
class FindDriveServer {

    constructor(
        @inject('DriveRepository')
        private driveRepository: IDriveRepository
    ) { }

    public async execute(nome: string): Promise<Drive[]> {

        const whereConditions: any = {};

        if (nome) {
            whereConditions.nome = ILike(`%${nome}%`);
        }

        return await this.driveRepository.find(whereConditions);
    }
    
}
export { FindDriveServer }