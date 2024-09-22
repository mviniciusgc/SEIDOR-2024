import Car from '../../../db/entity/car'

interface ICarRepository {
    create(data: Car): Promise<Car>;
    find(marca?:string, cor?: string): Promise<Car[]>;
    findOne(id: number): Promise<Car | null>;
    delete(id: number): Promise<void>;
    update(data: Car): Promise<Car>;
}

export { ICarRepository }