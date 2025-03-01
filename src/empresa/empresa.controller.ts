import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import exp from 'constants';
import { EmpresaService } from './empresa.service';
import { Empresa } from './empresa.entity';

@Controller('empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Get()
  async findAll(): Promise<Empresa[]> {
    return this.empresaService.findAll();
  }

  @Post()
  async create(@Body() empresa: Partial<Empresa>): Promise<Empresa> {
    return this.empresaService.create(empresa);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Empresa | null> {
    return this.empresaService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() Empresa: Partial<Empresa>,
  ): Promise<Empresa | null> {
    return this.empresaService.update(id, Empresa);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.empresaService.delete(id);
      return { message: 'Empresa eliminada correctamente' };
    } catch (error) {
      throw new NotFoundException('Error al eliminar el Empresa');
    }
  }
}
