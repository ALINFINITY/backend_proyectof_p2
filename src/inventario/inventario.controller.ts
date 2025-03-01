import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { Inventario } from './inventario.entity';

@Controller('inventario')
export class InventarioController {
  constructor(private inventarioService: InventarioService) {}

  @Get()
  async findAll() {
    return await this.inventarioService.findAll();
  }

  @Post('empresa/:empresaId')
  async crear(
    @Param('empresaId', ParseIntPipe) empresaId: number,
  ): Promise<Inventario> {
    return await this.inventarioService.create(empresaId);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.inventarioService.delete(id);
      return { message: 'Servicio eliminado correctamente' };
    } catch (error) {
      throw new NotFoundException('Error al eliminar el servicio');
    }
  }
}
