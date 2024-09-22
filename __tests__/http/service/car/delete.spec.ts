import "reflect-metadata";
import { DeleteCarServer } from '../../../../src/http/service/car/delete';
import { ICarRepository } from '../../../../src/http/Repository/interface/ICarRepository';
import Car from '../../../../src/db/entity/car';

describe('DeleteCarServer', () => {
    let deleteCarServer: DeleteCarServer;
    let carRepository: ICarRepository;

    beforeEach(() => {
        carRepository = {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
        } as unknown as ICarRepository;


        deleteCarServer = new DeleteCarServer(carRepository);
    });

    it('deve excluir um carro com sucesso', async () => {
        const carId = 1;

        await deleteCarServer.execute(carId);

        expect(carRepository.delete).toHaveBeenCalledWith(carId);
    });
});
