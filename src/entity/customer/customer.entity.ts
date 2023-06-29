import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export interface FilterCustomers {
  name?: string;
  age?: number;
  work?: string;
  email?: string;
}
