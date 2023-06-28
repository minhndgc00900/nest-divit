import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entity/customer/customer.entity';
import { BOOKS } from 'src/mocks/books.mock';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  customers = BOOKS;

  getCustomers(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.customers);
    });
  }

  getCustomer(cusId: string): Promise<any> {
    const id = Number(cusId);
    return new Promise((resolve) => {
      const customer = this.customers.find((customer) => customer.id === id);
      if (!customer) {
        throw new HttpException('Book does not exist', 404);
      }
      resolve(customer);
    });
  }

  async addCustomer(
    name: string,
    age: string,
    email: string,
    work: string,
  ): Promise<Customer> {
    const customer = this.customerRepository.create({ name, age, email, work });
    return this.customerRepository.save(customer);
  }

  deleteCustomer(cusId): Promise<any> {
    const id = Number(cusId);
    return new Promise((resolve) => {
      const index = this.customers.findIndex((customer) => customer.id === id);
      if (index === -1) {
        throw new HttpException('Customer does not exist', 404);
      }
      this.customers.splice(1, index);
      resolve(this.customers);
    });
  }
}
