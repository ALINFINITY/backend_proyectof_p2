import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly CategoriaService: CategoriaService) {}

  @Get()
  async findAll() {
    return await this.CategoriaService.findAll();
  }

  @Post()
  async create(@Body() categoria: Partial<Categoria>): Promise<Categoria> {
    return this.CategoriaService.create(categoria);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Categoria | null> {
    return this.CategoriaService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() rol: Partial<Categoria>,
  ): Promise<Categoria| null> {
    return this.CategoriaService.update(id, rol);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.CategoriaService.delete(id);
      return { message: 'Categoria eliminada correctamente' };
    } catch (error) {
      throw new NotFoundException('Error al eliminar la categoría');
    }
  }
}
