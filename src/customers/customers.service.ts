import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { _ } from 'lodash';
import { Customer, FilterCustomers } from './customer.entity';
import { Photo } from 'src/photo/photo.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async getCustomers(queryParams: FilterCustomers): Promise<Customer[]> {
    let filters = {};
    const { name, age, email, work } = queryParams;

    if (name) {
      filters = { ...filters, name: Like(`%${name}%`) };
    }

    if (age) {
      filters = { ...filters, age };
    }

    if (email) {
      filters = { ...filters, email: Like(`%${email}%`) };
    }

    if (work) {
      filters = { ...filters, work: Like(`%${work}%`) };
    }

    const customers = await this.customerRepository.find({
      where: filters,
      relations: {
        photos: true,
      },
    });

    return customers;
  }

  async getCustomer(cusId: number): Promise<Customer> {
    return this.customerRepository.findOneBy({
      id: cusId,
    });
  }

  async addCustomer(
    name: string,
    age: number,
    email: string,
    work: string,
    photo: string,
  ): Promise<Customer> {
    console.log(photo);

    const newCustomer = await this.customerRepository.save({
      name,
      age,
      email,
      work,
    });

    const newPhoto = await this.photoRepository.save({
      url: photo,
      customerId: newCustomer.id,
    });

    newCustomer.photos = [newPhoto];

    return this.customerRepository.save(newCustomer);
  }

  async editCustomer(
    id: number,
    age: number,
    email: string,
    work: string,
  ): Promise<Customer> {
    return this.customerRepository.save({ id, age, email, work });
  }
}
