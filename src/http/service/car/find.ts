import { injectable, inject } from "tsyringe";
import { ICarRepository } from '../../Repository/interface/ICarRepository'
import Car from '../../../db/entity/car'
import { ILike } from 'typeorm'

@injectable()
class FindCarServer {

    constructor(
        @inject('CarRepository')
        private carRepository: ICarRepository
    ) { }

    public async execute(marca?:string, cor?: string): Promise<Car[]> {

        const whereConditions: any = {};

        if (cor) {
            whereConditions.cor = ILike(`%${cor}%`);
        }

        if (marca) {
            whereConditions.marca = ILike(`%${marca}%`);
        }


        return await this.carRepository.find(whereConditions);
    }
    
}
export { FindCarServer }