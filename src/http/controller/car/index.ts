import { Response, Request } from 'express';
import { container } from 'tsyringe';
 import { CreateCarServer } from '../../service/car/create'
 import { FindCarServer } from '../../service/car/find'
 import { FindOneCarServer } from '../../service/car/findOne'
 import { DeleteCarServer } from '../../service/car/delete'
 import { UpdateCarServer } from '../../service/car/update'
 import { ICar } from '../../Repository/interfaceDTO/car'

class CarController {

    public async create(request: Request, response: Response): Promise<Response> {
        try{

            const data:ICar = request.body ;
            if(!data.cor || !data.marca || !data.placa){
                response.status(400).json({message:`Dados informados estão incorretos`})
            }
            
            const createCar = container.resolve(CreateCarServer)
            const result = await createCar.execute(data)

            return response.status(201).json(result);

        }catch(e) {
            return response.status(400).json({message:`Erro ao criar o novo Carro: ${e}`})
        }
    }

    public async find(request: Request, response: Response): Promise<Response> {
        try{
            const {marca, cor}: ICar = request.body ;
            const findCar = container.resolve(FindCarServer)

            const result = await findCar.execute(marca, cor)

            return response.status(200).json(result);

        }catch(e) {
            return response.status(400).json({message:`Erro ao buscar os Carros: ${e}`})
        }
    }
    public async findOne(request: Request, response: Response): Promise<Response> {
        try{
            const {id} = request.params ;

            if(!id){
                return response.status(400).send({message: "o Id não pode ser nullo"})
            }

            const findOneCar = container.resolve(FindOneCarServer)
            const result = await findOneCar.execute(Number(id))

            return response.status(200).json(result ?? {});

        }catch(e) {
            return response.status(400).json({message:`Erro ao buscar o Carro: ${e}`})
        }
    }
    public async update(request: Request, response: Response): Promise<Response> {
        try{

            const {id} = request.params ;
            
            if(!id){
                return response.status(400).send({message: "o Id não pode ser nullo"})
            }

            const data:ICar = request.body ;

            const updateCar = container.resolve(UpdateCarServer)
            const result = await updateCar.execute({ ...data, id: Number(id) })

            if(result instanceof Error){
                return response.status(400).json(result.message)    
            }

            return response.status(200).json(result);

        }catch(e) {
            return response.status(400).json({message:`Erro ao atualizar o Carro: ${e}`})
        }
    }
    public async delete(request: Request, response: Response): Promise<Response> {
        try{

            const {id} = request.params ;

            if(!id){
                return response.status(400).send({message: "o Id não pode ser nullo"})
            }

            const deleteCar = container.resolve(DeleteCarServer)
            await deleteCar.execute(Number(id))

            return response.status(200).json("Carro excluido com sucesso");

        }catch(e) {
            return response.status(400).json({message:`${e}`})
        }
    }
}

export { CarController }