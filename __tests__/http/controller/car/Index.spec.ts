import 'reflect-metadata';
import { CarController } from '../../../../src/http/controller/car';
import { CreateCarServer } from '../../../../src/http/service/car/create'
import { FindCarServer } from '../../../../src/http/service/car/find'
import { FindOneCarServer } from '../../../../src/http/service/car/findOne'
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ICarRepository } from '../../../../src/http/Repository/interface/ICarRepository';
import { CarRepository } from '../../../../src/http/Repository/car';
import Car from '../../../../src/db/entity/car';

jest.mock('../../../../src/http/service/car/create');
jest.mock('../../../../src/http/service/car/find');
jest.mock('../../../../src/http/service/car/findOne');


container.registerSingleton<ICarRepository>('CarRepository', CarRepository);
let carController: CarController;
let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

const mockBeforeEach = () => {
    beforeEach(() => {
        carController = new CarController();
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
}

const mockCreateCarServer = () => {
    const createCarMock = jest.fn();
    (CreateCarServer as jest.Mock).mockImplementation(() => ({
        execute: createCarMock,
    }));
    createCarMock.mockResolvedValue({ id: 1, marca: 'Honda', cor: 'azul',placa: "ABC1D12"  });
}

const mockFindCarServer = (data:Array<Car>) => {
    const findCarMock = jest.fn();
    (FindCarServer as jest.Mock).mockImplementation(() => ({
        execute: findCarMock,
    }));
    findCarMock.mockResolvedValue(data);
}
const mockFindOneCarServer = (data?:Car) => {
    const findOneCarMock = jest.fn();
    (FindOneCarServer as jest.Mock).mockImplementation(() => ({
        execute: findOneCarMock,
    }));
    findOneCarMock.mockResolvedValue(data);
}

describe('Create car', () => {

    mockBeforeEach();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Deve criar o carro e retornar com o id ', async () => {
        mockRequest.body = { marca: 'Honda', cor: 'azul',placa: "ABC1D12"  };
        mockCreateCarServer()

        await carController.create(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ id: 1, marca: 'Honda', cor: 'azul',placa: "ABC1D12" });

    })

    it('Não deve criar o carro ao nao informar a marca', async () => {
        mockRequest.body = { cor: 'azul',placa: "ABC1D12"  };
        await carController.create(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(400);

    })
    it('Não deve criar o carro ao nao informar a cor', async () => {
        mockRequest.body = { marca: 'Honda',placa: "ABC1D12"  };
        await carController.create(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(400);

    })
    it('Não deve criar o carro ao nao informar a placa', async () => {
        mockRequest.body = { marca: 'Honda',cor: 'azul'  };
        await carController.create(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(400);

    })

});

describe('Find car', () => {

    mockBeforeEach();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Deve buscar a lista de carros', async () => {
        mockFindCarServer([
            { id: 1, marca: 'Honda', cor: 'azul',placa: "ABC1D12"  },
            { id: 2, marca: 'Fiat', cor: 'Preto',placa: "SBC1D12"  }
        ])
        mockRequest.body = { };

        await carController.find(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith([
            { id: 1, marca: 'Honda', cor: 'azul',placa: "ABC1D12"  },
            { id: 2, marca: 'Fiat', cor: 'Preto',placa: "SBC1D12"  }
        ]);

    })

    it('Deve buscar a lista de carros pela cor', async () => {
        mockFindCarServer([
            { id: 2, marca: 'Fiat', cor: 'Preto',placa: "SBC1D12"  }
        ])
        mockRequest.body = {cor: "preto" };

        await carController.find(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith([
            { id: 2, marca: 'Fiat', cor: 'Preto',placa: "SBC1D12"  }
        ]);
    })

    it('Deve buscar a lista de carros pela marca', async () => {
        mockFindCarServer([
            { id: 2, marca: 'Fiat', cor: 'Preto',placa: "SBC1D12"  }
        ])
        mockRequest.body = {marca: "Fiat" };

        await carController.find(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith([
            { id: 2, marca: 'Fiat', cor: 'Preto',placa: "SBC1D12"  }
        ]);
    })

    it('Deve retornar erro ao não passar o corpo da requisição', async () => {

        await carController.find(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
    })

});

describe('FindOne car', () => {

    mockBeforeEach();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Deve buscar a lista de carros', async () => {
        mockFindOneCarServer({ id: 1, marca: 'Honda', cor: 'azul',placa: "ABC1D12"  })
        mockRequest.params = {id:"14"};

        await carController.findOne(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ id: 1, marca: 'Honda', cor: 'azul',placa: "ABC1D12"  });
    })

    it('Deve retornar null para id não encontrado', async () => {
        mockFindOneCarServer()
        mockRequest.params = {id:"16"};

        await carController.findOne(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({});
    })

    it('Deve retornar erro para id não informado', async () => {
        mockFindOneCarServer()

        await carController.findOne(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
    })

});