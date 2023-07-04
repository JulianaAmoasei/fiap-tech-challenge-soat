import { jest } from '@jest/globals';

import UsuarioRepository from '../../../../core/applications/repositories/usuarioRepository';
import UsuarioService from '../../../../core/applications/services/usuarioService';

jest.mock('../../../../core/applications/services/usuarioService');
jest.mock('../../../../core/applications/repositories/usuarioRepository');

const usuario = {
  id: '1',
  cpf: '02588470009',
  email: 'user@email.com',
  nome: 'Usuario Teste',
};

const usuario2 = {
  id: '2',
  cpf: '05641775045',
  email: 'user@email.com',
  nome: 'Usuario Teste Dois',
};

describe('UsuarioService', () => {
  const usuarioRepositoryMock = {
    criaUsuario: jest.fn().mockReturnValueOnce(usuario),
    listaUsuarios: jest.fn().mockReturnValueOnce([usuario, usuario2]),
    retornaUsuario: jest.fn().mockReturnValueOnce(usuario2),
    filtraUsuario: jest.fn().mockReturnValueOnce(null)
  } as unknown as UsuarioRepository;

  const usuarioService = new UsuarioService(usuarioRepositoryMock);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('criar um usuário', () => {
    it('deve criar um usuário com sucesso', async () => {
      const result = await usuarioService.criaUsuario(usuario);
      expect(result).toEqual(usuario);
      expect(usuarioRepositoryMock.filtraUsuario).toHaveBeenCalledWith(usuario.cpf, usuario.email);
      expect(usuarioRepositoryMock.criaUsuario).toHaveBeenCalledWith(usuario);
    });
  });

  describe('listar usuários', () => {
    it('deve retornar lista de usuários', async () => {
      const result = await usuarioService.listaUsuarios();
      expect(result).toEqual([usuario, usuario2]);
      expect(usuarioRepositoryMock.listaUsuarios).toHaveBeenCalled();
    });
  });

  describe('retorna usuário', () => {
    it('deve retornar usuário por id', async () => {
      const result = await usuarioService.retornaUsuario('05641775045');
      expect(result).toEqual(usuario2);
      expect(usuarioRepositoryMock.retornaUsuario).toHaveBeenCalledWith('05641775045');
    });
  });
});
