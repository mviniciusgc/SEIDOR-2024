import { injectable, inject } from "tsyringe";
import { ICarRepository } from '../../Repository/interface/ICarRepository'

@injectable()
class DeleteCarServer {

    constructor(
        @inject('CarRepository')
        private carRepository: ICarRepository
    ) { }

    public async execute(id: number): Promise<void> {
        await this.carRepository.delete(id);
    }
    
}
export { DeleteCarServer }