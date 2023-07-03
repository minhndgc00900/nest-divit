import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../customers/customer.entity';

@Entity('photo')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  customerId: number;

  @OneToOne(() => Customer, (customer: Customer) => customer.photos)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;
}
