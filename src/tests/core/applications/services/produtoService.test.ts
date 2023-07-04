import { jest } from '@jest/globals';

import ProdutoRepository from '../../../../core/applications/repositories/produtoRepository';
import ProdutoService from '../../../../core/applications/services/produtoService';

jest.mock('../../../../core/applications/services/categoriaService');
jest.mock('../../../../core/applications/repositories/produtoRepository');

const produto = {
  id: '123',
  nome: 'Produto Teste',
  categoriaId: '1',
  preco: 10,
  descricao: 'Descrição do produto',
  imagens: [{ id: '2', url: 'http://api.com/prod.jpg' }],
};
const produto2 = {
  id: '1',
  nome: 'Produto Outro Teste',
  categoriaId: '1',
  preco: 15,
  descricao: 'Descrição do outro produto',
  imagens: [{ id: '2', url: 'http://api.com/prod.jpg' }],
};

describe('ProdutoService', () => {
  const produtoRepositoryMock = {
    criaProduto: jest.fn().mockReturnValueOnce(produto),
    deletaProduto: jest.fn().mockReturnValueOnce(1),
    editaProduto: jest.fn().mockReturnValueOnce(produto2),
    listaProdutos: jest.fn().mockReturnValueOnce([produto, produto2]),
    retornaProduto: jest.fn().mockReturnValueOnce(produto2),
  } as unknown as ProdutoRepository;

  const produtoService = new ProdutoService(produtoRepositoryMock);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('criar um produto', () => {
    it('deve criar um produto com sucesso', async () => {
      const result = await produtoService.criaProduto(produto);
      expect(result).toEqual(produto);
      expect(produtoRepositoryMock.criaProduto).toHaveBeenCalledWith(produto);
    });
  });

  describe('deletar um produto', () => {
    it('deve deletar um produto', async () => {
      const result = await produtoService.deletaProduto('1');
      expect(result).toEqual(1);
      expect(produtoRepositoryMock.deletaProduto).toHaveBeenCalledWith('1');
    });
  });

  describe('editar um produto', () => {
    it('deve editar um produto', async () => {
      const result = await produtoService.editaProduto('1', produto2);
      expect(result).toEqual(produto2);
      expect(produtoRepositoryMock.editaProduto).toHaveBeenCalledWith(
        '1',
        produto2
      );
    });
  });

  describe('listar produtos', () => {
    it('deve retornar lista de produtos', async () => {
      const result = await produtoService.listaProdutos({ categoriaId: '1' });
      expect(result).toEqual([produto, produto2]);
      expect(produtoRepositoryMock.listaProdutos).toHaveBeenCalled();
    });
  });

  describe('retorna produto', () => {
    it('deve retornar produto por id', async () => {
      const result = await produtoService.retornaProduto('1');
      expect(result).toEqual(produto2);
      expect(produtoRepositoryMock.retornaProduto).toHaveBeenCalledWith('1');
    });
  });
});
