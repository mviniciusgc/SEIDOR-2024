import {Entity, Column, PrimaryGeneratedColumn,OneToOne} from 'typeorm'
import CarUse from './carUse'


@Entity('car')
class Car {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', {length: 100, nullable: false})
    placa: string

    @Column('varchar', {length: 100, nullable: false})
    cor: string

    @Column('varchar', {length: 100, nullable: false})
    marca: string

    @OneToOne(() => CarUse, (carUse) => carUse.car)
    carUse?: CarUse;
}

export default Car