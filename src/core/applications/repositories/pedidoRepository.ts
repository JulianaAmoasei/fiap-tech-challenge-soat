import { ItemDoPedido } from "~core/domain/itemPedido";
import { Pedido, StatusDoPedido } from "~core/domain/pedido";

export type CriaPedidoInput = {
  clienteId?: string | null;
  valor: number;
  status: StatusDoPedido;
};

export type AdicionaItemInput = {
  pedidoId: string;
  produtoId: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  observacao?: string | null;
};

export type RemoveItemInput = {
  pedidoId: string;
  itemId: string;
  valorPedido: number;
};

export type RetornaItemInput = {
  id: string;
};

export default interface PedidoRepository {
  criaPedido(criarPedidoInput: CriaPedidoInput): Promise<Pedido>;
  adicionaItem(adicionarItemInput: AdicionaItemInput): Promise<Pedido | null>;
  retornaPedido(id: string): Promise<Pedido | null>;
  removeItem(removeItemInput: RemoveItemInput): Promise<Pedido | null>;
  retornaItem(id: string): Promise<ItemDoPedido | null>;
}
