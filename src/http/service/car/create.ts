import { injectable, inject } from "tsyringe";
import { ICarRepository } from '../../Repository/interface/ICarRepository'
import { ICar } from '../../Repository/interfaceDTO/car'
import Car from '../../../db/entity/car'

@injectable()
class CreateCarServer {

    constructor(
        @inject('CarRepository')
        private carRepository: ICarRepository
    ) { }

    public async execute(data:ICar ): Promise<Car> {
        const newCar = new Car();

        newCar.placa = data.placa;
        newCar.cor = data.cor;
        newCar.marca = data.marca;
    
        if (data.id !== undefined) {
            newCar.id = data.id;
        }

        return await this.carRepository.create(newCar);
    }
    
}
export { CreateCarServer }