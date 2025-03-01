import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { find } from 'rxjs';
import { Usuario } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Usuario | null> {
    return this.usuarioService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Usuario>): Promise<Usuario> {
    return await this.usuarioService.create(data);
  }

  @Post(':userId/rol/:rolId')
  async asignarRol(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('rolId', ParseIntPipe) rolId: number,
  ): Promise<Usuario> {
    return this.usuarioService.asigarRol(userId, rolId);
  }

  @Post(':userId/empresa/:empresaId')
  async asignarEmpresa(
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Usuario> {
    return this.usuarioService.asignarEmpresa(userId, empresaId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() usuario: Partial< Usuario>,
  ): Promise<Usuario | null> {
    return this.usuarioService.update(id, usuario);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.usuarioService.delete(id);
      return { message: 'Usuario eliminado correctamente' };
    } catch (error) {
      throw new NotFoundException('Error al eliminar el usuario');
    }
  }
}
