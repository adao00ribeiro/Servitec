import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AddressService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createAddressDto: CreateAddressDto) {
    try {
      await this.prisma.address.create({
        data: createAddressDto
      })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new Error('Error Address');
        }
      }
    }
  }

  async findAll() {
    return await this.prisma.address.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.address.findUnique({
      where: { id }
    });
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {

    const address = await this.findOne(id);
    if (!address) {
      throw new Error('Record to update does not exist.');
    }
    return await this.prisma.address.update({
      where: { id },
      data: updateAddressDto
    })
  }

  async remove(id: string) {
    try {
      return await this.prisma.address.delete({
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
