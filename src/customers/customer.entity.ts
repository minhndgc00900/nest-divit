import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from '../photo/photo.entity';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('varchar', { nullable: false, length: 255, name: 'title' })
  name!: string;

  @Column('integer', { nullable: true, name: 'age' })
  age?: number;

  @Column('varchar', { nullable: true, name: 'work' })
  work?: string;

  @Column('varchar', { nullable: true, name: 'email' })
  email?: string;

  @OneToMany(() => Photo, (photo: Photo) => photo.customer)
  photos?: Photo[];
}

export interface FilterCustomers {
  name?: string;
  age?: number;
  work?: string;
  email?: string;
}
