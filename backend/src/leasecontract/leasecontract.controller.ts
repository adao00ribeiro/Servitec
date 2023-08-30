import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { LeasecontractService } from './leasecontract.service';
import { CreateLeasecontractDto } from './dto/create-leasecontract.dto';
import { UpdateLeasecontractDto } from './dto/update-leasecontract.dto';

@Controller('leasecontract')
export class LeasecontractController {
  constructor(private readonly leasecontractService: LeasecontractService) { }

  @Post()
  async create(@Body() createLeasecontractDto: CreateLeasecontractDto) {
    return await this.leasecontractService.create(createLeasecontractDto);
  }

  @Get()
  async findAll() {
    return await this.leasecontractService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.leasecontractService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLeasecontractDto: UpdateLeasecontractDto) {
    return await this.leasecontractService.update(id, updateLeasecontractDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.leasecontractService.remove(id);
  }
}
