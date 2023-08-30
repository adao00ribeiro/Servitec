import { Injectable } from '@nestjs/common';
import { CreateIdentityDto } from './dto/create-identity.dto';
import { UpdateIdentityDto } from './dto/update-identity.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class IdentityService {

  constructor(private readonly prisma: PrismaService) { }


  async create(createIdentityDto: CreateIdentityDto) {

    try {
      const identity = await this.prisma.identity.create({
        data: createIdentityDto
      })
      return identity;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new Error('There is a unique constraint violation, a new user cannot be created with this email');
        }
      }
    }

  }

  async findAll() {
    return this.prisma.identity.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.identity.findUnique({
      where: { id: id }
    });
  }

  async update(id: string, updateIdentityDto: UpdateIdentityDto) {

    const identity = await this.findOne(id);
    if (!identity) {
      throw new Error('Record to update does not exist.');
    }
    return this.prisma.identity.update({
      where: { id },
      data: updateIdentityDto
    })
  }

  async remove(id: string) {
    try {
      return await this.prisma.identity.delete({
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
