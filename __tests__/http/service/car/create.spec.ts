import "reflect-metadata";
import { CreateCarServer } from '../../../../src/http/service/car/create';
import { ICarRepository } from '../../../../src/http/Repository/interface/ICarRepository';
import { ICar } from '../../../../src/http/Repository/interfaceDTO/car';
import Car from '../../../../src/db/entity/car';

const mockCarRepository = (): ICarRepository => ({
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),

});

describe('CreateCarServer', () => {
  let createCarServer: CreateCarServer;
  let carRepository: ICarRepository;

  beforeEach(() => {
    carRepository = mockCarRepository();
    
    createCarServer = new CreateCarServer(carRepository);
  });

  it('deve criar um carro com sucesso', async () => {
    const carData: ICar = {
      placa: 'ABC-1234',
      cor: 'Preto',
      marca: 'Toyota',
    };

    const mockCar = new Car();
    mockCar.placa = carData.placa;
    mockCar.cor = carData.cor;
    mockCar.marca = carData.marca;

    (carRepository.create as jest.Mock).mockResolvedValue(mockCar);

    const result = await createCarServer.execute(carData);

    expect(result).toEqual(mockCar);
    expect(carRepository.create).toHaveBeenCalledWith(carData);
  });
});
