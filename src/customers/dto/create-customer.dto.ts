import { Photo } from 'src/photo/photo.entity';

export class CreateCustomerDTO {
  readonly id: number;
  readonly name: string;
  readonly age: number;
  readonly work: string;
  readonly email: string;
  readonly photos: Photo[];
}
