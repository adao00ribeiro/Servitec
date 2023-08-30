import { Injectable } from '@nestjs/common';
import { CreateLeasecontractDto } from './dto/create-leasecontract.dto';
import { UpdateLeasecontractDto } from './dto/update-leasecontract.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LeasecontractService {

  constructor(private readonly prisma: PrismaService) { }
  async create(createLeasecontractDto: CreateLeasecontractDto) {
    try {
      return await this.prisma.leaseContract.create(
        {
          data: createLeasecontractDto
        }
      );
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new Error('There is a unique constraint violation, a new user cannot be created with this email');
        }
      }
    }
  }

  async findAll() {
    return await this.prisma.leaseContract.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.leaseContract.findUnique({
      where: { id }
    });
  }

  async update(id: string, updateLeasecontractDto: UpdateLeasecontractDto) {
    const contract = await this.findOne(id);
    if (!contract) {
      throw new Error('Record to update does not exist.');
    }
    return await this.prisma.leaseContract.update({
      where: { id },
      data: updateLeasecontractDto
    })
  }

  async remove(id: string) {
    try {
      return await this.prisma.leaseContract.delete({
        where: { id }
      })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new Error('Record to delete does not exist.');
        }
      }
    }
  }
}
