import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { CreateIdentityDto } from './dto/create-identity.dto';
import { UpdateIdentityDto } from './dto/update-identity.dto';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) { }

  @Post()
  async create(@Body() createIdentityDto: CreateIdentityDto) {
    return await this.identityService.create(createIdentityDto);
  }

  @Get()
  async findAll() {
    return await this.identityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.identityService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateIdentityDto: UpdateIdentityDto) {
    return await this.identityService.update(id, updateIdentityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.identityService.remove(id);
  }
}
