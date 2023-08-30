import { PartialType } from '@nestjs/mapped-types';
import { CreateLeasecontractDto } from './create-leasecontract.dto';

export class UpdateLeasecontractDto extends PartialType(CreateLeasecontractDto) {}
