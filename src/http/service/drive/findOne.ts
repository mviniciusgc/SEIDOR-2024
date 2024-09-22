import { injectable, inject } from "tsyringe";
import { IDriveRepository } from '../../Repository/interface/IDriveRepository'
import Drive from '../../../db/entity/drive'

@injectable()
class FindOneDriveServer {

    constructor(
        @inject('DriveRepository')
        private driveRepository: IDriveRepository
    ) { }

    public async execute(id: number): Promise<Drive | null> {

        return await this.driveRepository.findOne(id);
    }
    
}
export { FindOneDriveServer }