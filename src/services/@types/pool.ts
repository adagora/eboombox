export interface PoolData {
  data: {
    active_epoch_no: number;
    active_stake: number;
    block_count: number;
    fixed_cost: number;
    live_delegators: number;
    live_pledge: number;
    live_saturation: string;
    live_stake: number;
    margin: number;
    meta_hash: string;
    meta_json: {
      description: string;
      homepage: string;
      name: string;
      ticker: string;
    };
    meta_url: string;
    op_cert: string;
    op_cert_counter: number;
    owners: string[];
    pledge: number;
    pool_id_bech32: string;
    pool_id_hex: string;
    pool_status: string;
    relays: {
      dns: string;
      ipv4: string;
      ipv6: string;
      port: number;
      srv: string;
    }[];
    retiring_epoch: number;
    reward_addr: string;
    sigma: string;
    vrf_key_hash: string;
  };
  last_updated: {
    block_hash: string;
    block_slot: number;
    timestamp: string;
  };
}
