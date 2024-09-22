import { injectable, inject } from "tsyringe";
import { IDriveRepository } from '../../Repository/interface/IDriveRepository'

@injectable()
class DeleteDriveServer {

    constructor(
        @inject('DriveRepository')
        private driveRepository: IDriveRepository
    ) { }

    public async execute(id: number): Promise<void> {
        await this.driveRepository.delete(id);
    }
    
}
export { DeleteDriveServer }