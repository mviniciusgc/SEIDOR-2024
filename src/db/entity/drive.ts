import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm'
import CarUse from './carUse'

@Entity('drive')
class Drive {

    @PrimaryGeneratedColumn('increment')
    id?: number

    @Column('varchar', {length: 100, nullable: false})
    nome: string

    @OneToOne(() => CarUse, (carUse) => carUse.drive)
    carUse?: CarUse;
}

export default Drive