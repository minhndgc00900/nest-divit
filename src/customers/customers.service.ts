import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer, FilterCustomers } from 'src/entity/customer/customer.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async getCustomers(queryParams: FilterCustomers): Promise<FilterCustomers[]> {
    let customers = await this.customerRepository.find();

    // how to check if all object keys has false values
    const isFalse = Object.keys(queryParams).every((k) => !queryParams[k]);

    if (!isFalse) {
      customers = await this.customerRepository.find({
        where: {
          name: Like(`%${queryParams.name}%`),
          age: queryParams.age,
          email: Like(`%${queryParams.email}%`),
          work: Like(`%${queryParams.work}%`),
        },
      });

      console.log({
        name: Like(`%${queryParams.name}%`),
        age: queryParams.age,
        email: Like(`%${queryParams.email}%`),
        work: Like(`%${queryParams.work}%`),
      });
    }

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
