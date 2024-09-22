import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm'
import Car from './car'
import Drive from './drive'

@Entity('car_use') // Nome da tabela
class CarUse {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'timestamp' })
    dataInicio: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    dataFim: Date | null;
  
    @Column('varchar')
    motivo: string;
  
    @OneToOne(() => Drive, (drive) => drive.carUse)
    @JoinColumn()
    drive: Drive;
  
    @OneToOne(() => Car, (car) => car.carUse)
    @JoinColumn()
    car: Car;
}

export default CarUse