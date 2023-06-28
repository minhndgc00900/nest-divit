import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  async getCustomers() {
    const customers = await this.customersService.getCustomers();
    return customers;
  }

  @Get(':cusID')
  async getCustomer(@Param('cusID') cusID) {
    const customer = await this.customersService.getCustomer(cusID);
    return customer;
  }

  @Post()
  async addCustomer(@Body() createCustomerDTO: CreateCustomerDTO) {
    const newCustomer = await this.customersService.addCustomer(
      createCustomerDTO.name,
      createCustomerDTO.age,
      createCustomerDTO.email,
      createCustomerDTO.work,
    );

    if (!newCustomer.id) {
      throw new InternalServerErrorException('NotCreatedData');
    }

    return { id: newCustomer.id };
  }
}
