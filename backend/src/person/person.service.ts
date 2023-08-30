import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Identity, Prisma } from '@prisma/client';

@Injectable()
export class PersonService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(createPersonDto: CreatePersonDto) {
    try {
      const person = this.prisma.person.create({
        data: createPersonDto
      })
      return person;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new Error('There is a unique constraint violation, a new user cannot be created with this email');
        }
      }
    }
  }

  async findAll() {
    return this.prisma.person.findMany({
      include: {
        identity: true
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    const person = await this.findOne(id);
    if (!person) {
      throw new Error('Record to update does not exist.');
    }
    return this.prisma.person.update({
      where: { id },
      data: updatePersonDto
    })
  }

  async remove(id: string) {
    try {
      return await this.prisma.person.delete({
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
