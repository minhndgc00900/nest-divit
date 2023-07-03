import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer, FilterCustomers } from 'src/entity/customer/customer.entity';
import { Like, Repository } from 'typeorm';
import { _ } from 'lodash';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async getCustomers(queryParams: FilterCustomers): Promise<FilterCustomers[]> {
    let filters = {};
    const { name, age, email, work } = queryParams;

    if (name) {
      filters = { ...filters, name: Like(`%${name}%`) };
    }

    if (age) {
      filters = { ...filters, age: age };
    }

    if (email) {
      filters = { ...filters, email: Like(`%${email}%`) };
    }

    if (work) {
      filters = { ...filters, work: Like(`%${work}%`) };
    }

    const customers = await this.customerRepository.find({
      where: filters,
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
  ): Promise<Customer> {
    const customer = this.customerRepository.create({ name, age, email, work });
    return this.customerRepository.save(customer);
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
