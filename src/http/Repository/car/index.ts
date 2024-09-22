import Car from '../../../db/entity/car'
import { ICarRepository } from '../interface/ICarRepository'
import {AppDataSource} from '../../../db/conection/data-source'

const carRepository = AppDataSource.getRepository(Car)

class CarRepository implements ICarRepository {

    public async create(data: Car): Promise<Car> {
        return carRepository.save(data)
    }

    public async find(whereConditions: any): Promise<Car[]> {

        return carRepository.find({
            where: whereConditions
        })
    }

    public async findOne(id: number): Promise<Car | null> {
        return carRepository.findOne({
            where: {
                id: id
            }
        })
    }
    public async update(data: Car): Promise<Car> {
        return carRepository.save({ ...data,id: Number(data.id)})
    }
    public async delete(id: number): Promise<void> {
        carRepository.delete(id)
    }
}

export { CarRepository }