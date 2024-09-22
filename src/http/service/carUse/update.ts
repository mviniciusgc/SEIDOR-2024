import { injectable, inject } from "tsyringe";
import { ICarUseRepository } from '../../Repository/interface/ICarUseRepository'
import CarUser from '../../../db/entity/carUse'

@injectable()
class UpdateCarUseServer {

    constructor(
        @inject('CarUseRepository')
        private carUseRepository: ICarUseRepository,
    ) { }

    public async execute(id:number ): Promise<CarUser | Error> {

        const carUse = await this.carUseRepository.findById(id);
        
        if(carUse == null){
            return new Error("registro não cadastrado")
        }
        carUse.dataFim = new Date();
        return await this.carUseRepository.update(carUse);
    }
    
}
export { UpdateCarUseServer }