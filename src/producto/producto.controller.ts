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
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';

@Controller('producto')
export class ProductoController {
  constructor(private readonly ProductoService: ProductoService) {}

  @Get()
  async getAll() {
    return await this.ProductoService.getAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Producto | null> {
    return this.ProductoService.findOne(id);
  }

  @Post()
  async create(@Body() producto: Producto): Promise<Producto> {
    return this.ProductoService.create(producto);
  }

  @Post(':productoId/categoria/:categoriaId/inventario/:inventarioId')
  async asignarCaracteristicas(
    @Param('productoId', ParseIntPipe) productoId: number,
    @Param('categoriaId', ParseIntPipe) categoriaId: number,
    @Param('inventarioId', ParseIntPipe) inventarioId: number,
  ): Promise<Producto> {
    return this.ProductoService.asignarCaracteristicas(
      productoId,
      categoriaId,
      inventarioId,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() producto: Partial<Producto>,
  ): Promise<Producto | null> {
    return this.ProductoService.update(id, producto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    try {
      await this.ProductoService.delete(id);
      return { message: 'Producto eliminado correctamente' };
    } catch (error) {
      throw new NotFoundException('Error al eliminar el producto');
    }
  }
}
