import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  create(categoria: Partial<Categoria>): Promise<Categoria> {
    const newCategoria = this.categoriaRepository.create(categoria);
    return this.categoriaRepository.save(newCategoria);
  }

  findById(id: number): Promise<Categoria | null> {
    return this.categoriaRepository.findOne({ where: { id_categoria: id } });
  }

  async update(id: number, rol: Partial<Categoria>): Promise<Categoria | null> {
    await this.categoriaRepository.update({ id_categoria: id }, rol);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.categoriaRepository.delete({ id_categoria: id });
  }
}
