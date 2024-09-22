import { injectable, inject } from "tsyringe";
import { IDriveRepository } from '../../Repository/interface/IDriveRepository'
import { IDrive } from '../../Repository/interfaceDTO/drive'
import Drive from '../../../db/entity/drive'

@injectable()
class CreateDriveServer {

    constructor(
        @inject('DriveRepository')
        private driveRepository: IDriveRepository
    ) { }

    public async execute(data:IDrive ): Promise<Drive> {

        return await this.driveRepository.create(data);
    }
    
}
export { CreateDriveServer }