import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Photo } from 'src/photo/photo.entity';
import { CustomersService } from './customers.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  async getCustomers(
    @Query('name') name: string,
    @Query('age') age: number,
    @Query('work') work: string,
    @Query('email') email: string,
  ) {
    const customers = await this.customersService.getCustomers({
      name,
      age,
      work,
      email,
    });
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
      createCustomerDTO.photos,
    );

    if (!newCustomer.id) {
      throw new InternalServerErrorException('NotCreatedData');
    }

    return { id: newCustomer.id };
  }

  @Put()
  async editCustomer(@Body() createCustomerDTO: CreateCustomerDTO) {
    const updatedCustomer = await this.customersService.editCustomer(
      createCustomerDTO.id,
      createCustomerDTO.age,
      createCustomerDTO.email,
      createCustomerDTO.work,
    );

    if (!updatedCustomer.id) {
      throw new InternalServerErrorException('NotUpdatedData');
    }

    return { id: updatedCustomer.id };
  }
}
