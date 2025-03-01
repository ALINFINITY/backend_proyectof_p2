import { Injectable } from '@nestjs/common';
import { Empresa } from './empresa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  findAll(): Promise<Empresa[]> {
    return this.empresaRepository.find({
      relations: ['usuarios', 'inventarios'],
    });
  }

  findById(id: number): Promise<Empresa | null> {
    return this.empresaRepository.findOne({ where: { id_empresa: id } });
  }

  create(empresa: Partial<Empresa>): Promise<Empresa> {
    const newEmpresa = this.empresaRepository.create(empresa);
    return this.empresaRepository.save(newEmpresa);
  }

  async update(id: number, empresa: Partial<Empresa>): Promise<Empresa | null> {
    await this.empresaRepository.update({ id_empresa: id }, empresa);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.empresaRepository.delete({id_empresa: id});
}
}
