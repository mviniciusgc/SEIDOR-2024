import CarUse from '../../../db/entity/carUse'
import Drive from '../../../db/entity/drive'
import Car from '../../../db/entity/car'

interface ICarUseRepository {
    create(data: CarUse): Promise<CarUse>;
    find(): Promise<CarUse[]>;
    findOne(drive?: Drive, car?: Car ): Promise<CarUse | null>;
    findById(id: number ): Promise<CarUse | null>;
    update(data: CarUse): Promise<CarUse>;
}

export { ICarUseRepository }