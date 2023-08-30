import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {


  constructor(private readonly prisma: PrismaService) {

  }
  async create(createUserDto: CreateUserDto) {
    try {
      const data: Prisma.UserCreateInput = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      };
      return await this.prisma.user.create(
        {
          data,
          select: {
            id: true,
            name: true,
            email: true,
            avatarurl: true,
            jobtitle: true,
          },
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
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatarurl: true,
        jobtitle: true,
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {

    const user = await this.findOne(id);
    if (!user) {
      throw new Error('Record to update does not exist.');
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto
    })
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
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