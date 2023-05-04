export interface ProviderOptions {
  debug?: boolean;
  chain: Chain;
  logger: Logger;
}

export interface EthProviderOptions extends ProviderOptions {
  chain: Chain.ETH;
  ethereum: EthConfig;
}

export interface EthConfig {
  chainId: number;
  rpc: string;
  address?: string;
}
