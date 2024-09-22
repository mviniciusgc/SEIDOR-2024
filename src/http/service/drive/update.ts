import { injectable, inject } from "tsyringe";
import { IDriveRepository } from '../../Repository/interface/IDriveRepository'
import { IDrive } from '../../Repository/interfaceDTO/drive'
import Drive from '../../../db/entity/drive'

@injectable()
class UpdateDriveServer {

    constructor(
        @inject('DriveRepository')
        private driveRepository: IDriveRepository,
        
    ) { }

    public async execute(data:IDrive ): Promise<Drive | Error> {
        const newDrive: Drive = {id:data.id, nome: data.nome}

        const drive = await this.driveRepository.findOne(Number(data.id));

        if(!drive){
            return new Error("Usuario não cadastrado")
        }

        return await this.driveRepository.update(newDrive);
    }
    
}
export { UpdateDriveServer }