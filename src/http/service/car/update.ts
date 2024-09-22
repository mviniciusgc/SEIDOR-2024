import { injectable, inject } from "tsyringe";
import { ICarRepository } from '../../Repository/interface/ICarRepository'
import { ICar } from '../../Repository/interfaceDTO/car'
import Car from '../../../db/entity/car'

@injectable()
class UpdateCarServer {

    constructor(
        @inject('CarRepository')
        private carRepository: ICarRepository
    ) { }

    public async execute(data:ICar ): Promise<Car | Error> {
        const newCar: Car = {id: Number(data.id), ...data}

        const car = await this.carRepository.findOne(Number(data.id));
        
        if(!car){
            return new Error("Carro não cadastrado")
        }
        return await this.carRepository.update(newCar);
    }
    
}
export { UpdateCarServer }