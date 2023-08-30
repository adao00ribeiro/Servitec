import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';


@Injectable()
export class CompanyService {

  constructor(private readonly prisma: PrismaService) {

  }

  async create(createCompanyDto: CreateCompanyDto) {

    try {
      const company = await this.findOneByCnpj(createCompanyDto.cnpj)
      if (company) {
        throw new HttpException('Cnpj ja existe', HttpStatus.FORBIDDEN);
      }


      const newCompany = await this.prisma.company.create({
        data: createCompanyDto,
        include: {
          address: true
        }
      });
      return newCompany
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('There is a unique constraint violation, a new user cannot be created with this email', HttpStatus.FORBIDDEN);
        }
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.company.findMany({
      include: {
        address: true
      }
    });
  }
  async findOneById(id: string) {
    return this.prisma.company.findUnique({
      where: { id }
    });
  }
  async findOneByCnpj(cnpj: string) {
    return await this.prisma.company.findUnique({
      where: { cnpj }
    });
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    console.log(updateCompanyDto)
    const user = await this.findOneById(id);
    if (!user) {
      throw new HttpException('Record to update does not exist.', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
      include: {
        address: true
      }
    })
  }

  async remove(id: string) {
    try {
      return await this.prisma.company.delete({
        where: { id }
      })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new HttpException('Record to delete does not exist.', HttpStatus.NOT_FOUND);
        }
      }
    }
  }
}
