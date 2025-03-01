import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolService } from './rol.service';
import { Rol } from './rol.entity';

@Controller('roles')
export class RolController {
  constructor(private readonly rolservice: RolService) {}

  @Get()
  async findAll() {
    return this.rolservice.findAll();
  }

  @Post()
  async create(@Body() rol: Partial<Rol>): Promise<Rol> {
    return this.rolservice.create(rol);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Rol | null> {
    return this.rolservice.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() rol: Partial<Rol>,
  ): Promise<Rol | null> {
    return this.rolservice.update(id, rol);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.rolservice.delete(id);
      return { message: 'Rol eliminado correctamente' };
    } catch (error) {
      throw new NotFoundException('Error al eliminar el rol');
    }
  }
}
