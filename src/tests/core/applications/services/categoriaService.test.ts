import { jest } from '@jest/globals';

import CategoriaRepository from '../../../../core/applications/repositories/categoriaRepository';
import CategoriaService from '../../../../core/applications/services/categoriaService';

jest.mock('../../../../core/applications/services/categoriaService');
jest.mock('../../../../core/applications/repositories/categoriaRepository');

const categoria = { id: '123', nome: 'Categoria teste' };
const createdCategoria = { ...categoria, id: '1' };
const categoria2 = { id: '1', nome: 'Categoria Atualizada' };

describe('CategoriaService', () => {

  const categoriaRepositoryMock = {
    criaCategoria: jest.fn().mockReturnValueOnce({ id: '1', nome: 'Categoria teste' }),
    deletaCategoria: jest.fn().mockReturnValueOnce(1),
    editaCategoria: jest.fn().mockReturnValueOnce(categoria2),
    listaCategorias: jest.fn().mockReturnValueOnce([categoria, categoria2]),
    retornaCategoria: jest.fn().mockReturnValueOnce({ id: '1', nome: 'Categoria Atualizada' }),
  } as unknown as CategoriaRepository;

  const categoriaService = new CategoriaService(categoriaRepositoryMock);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('criar uma categoria', () => {
    it('deve criar uma categoria com sucesso', async () => {

      const result = await categoriaService.criaCategoria(categoria);
      expect(result).toEqual(createdCategoria);
      expect(categoriaRepositoryMock.criaCategoria).toHaveBeenCalledWith(categoria);
    })
  })

  describe('deletar uma categoria', () => {
    it('deve deletar uma categoria', async () => {
      const result = await categoriaService.deletaCategoria('1');
      expect(result).toEqual(1);
      expect(categoriaRepositoryMock.deletaCategoria).toHaveBeenCalledWith('1');
    })
  })

  describe('editar uma categoria', () => {
    it('deve editar uma categoria', async () => {
      const result = await categoriaService.editaCategoria('1', categoria2);
      expect(result).toEqual(categoria2);
      expect(categoriaRepositoryMock.editaCategoria).toHaveBeenCalledWith('1', categoria2);
    })
  })

  describe('listar categorias', () => {
    it('deve retornar lista de categorias', async () => {
      const result = await categoriaService.listaCategorias();
      expect(result).toEqual([categoria, categoria2]);
      expect(categoriaRepositoryMock.listaCategorias).toHaveBeenCalled();
    })
  })

  describe('retorna categoria', () => {
    it('deve retornar categoria por id', async () => {
      const result = await categoriaService.retornaCategoria('1');
      expect(result).toEqual(categoria2);
      expect(categoriaRepositoryMock.retornaCategoria).toHaveBeenCalledWith('1');
    })
  })
})