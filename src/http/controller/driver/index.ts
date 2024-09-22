import { Response, Request } from 'express';
import { container } from 'tsyringe';
 import { CreateDriveServer } from '../../service/drive/create'
 import { FindDriveServer } from '../../service/drive/find'
 import { FindOneDriveServer } from '../../service/drive/findOne'
 import { DeleteDriveServer } from '../../service/drive/delete'
 import { UpdateDriveServer } from '../../service/drive/update'
 import { IDrive } from '../../Repository/interfaceDTO/drive'

class DriveController {

    public async create(request: Request, response: Response): Promise<Response> {
        try{

            const data:IDrive = request.body ;
            if(!data.nome){
                response.status(400).json({message:`Dados informados estão incorretos`})
            }
            
            const createDrive = container.resolve(CreateDriveServer)
            const result = await createDrive.execute(data)

            return response.status(201).json(result);

        }catch(e) {
            return response.status(400).json({message:`Erro ao criar o novo motorista: ${e}`})
        }
    }

    public async find(request: Request, response: Response): Promise<Response> {
        try{
            const {nome}: IDrive = request.body ;
            const findDrive = container.resolve(FindDriveServer)

            const result = await findDrive.execute(nome)

            return response.status(200).json(result);

        }catch(e) {
            return response.status(400).json({message:`Erro ao buscar os motoristas: ${e}`})
        }
    }
    public async findOne(request: Request, response: Response): Promise<Response> {
        try{
            const {id} = request.params ;

            if(!id){
                return response.status(400).send({message: "o Id não pode ser nullo"})
            }

            const findOneCar = container.resolve(FindOneDriveServer)
            const result = await findOneCar.execute(Number(id))

            return response.status(200).json(result ?? {});

        }catch(e) {
            return response.status(400).json({message:`Erro ao buscar o motorista: ${e}`})
        }
    }
    public async update(request: Request, response: Response): Promise<Response> {
        try{

            const {id} = request.params ;
            
            if(!id){
                return response.status(400).send({message: "o Id não pode ser nullo"})
            }

            const data:IDrive = request.body ;

            const updateDrive = container.resolve(UpdateDriveServer)
            const result = await updateDrive.execute({id:Number(id), ...data})

            if(result instanceof Error){
                return response.status(400).json(result.message)    
            }
            

            return response.status(200).json(result);

        }catch(e) {
            return response.status(400).json({message:`Erro ao atualizar o motorista: ${e}`})
        }
    }
    public async delete(request: Request, response: Response): Promise<Response> {
        try{

            const {id} = request.params ;

            if(!id){
                return response.status(400).send({message: "o Id não pode ser nullo"})
            }

            const deleteDrive = container.resolve(DeleteDriveServer)
            await deleteDrive.execute(Number(id))

            return response.status(200).json("Motorista excluido com sucesso");

        }catch(e) {
            return response.status(400).json({message:`${e}`})
        }
    }
}

export { DriveController }