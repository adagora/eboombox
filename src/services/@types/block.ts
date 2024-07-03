export interface BlockSummary {
  data: {
    absolute_slot: number;
    block_producer: string;
    confirmations: number;
    epoch: number;
    epoch_slot: number;
    era: string;
    hash: string;
    height: number;
    next_block: string;
    operational_certificate: {
      hot_vkey: string;
      kes_period: number;
      kes_signature: string;
      sequence_number: number;
    };
    previous_block: string;
    protocol_version: number[];
    script_invocations: number;
    size: number;
    timestamp: string;
    total_ex_units: {
      mem: number;
      steps: number;
    };
    total_fees: number;
    total_output_lovelace: string;
    tx_hashes: string[];
    vrf_key: string;
  };
  last_updated: {
    block_hash: string;
    block_slot: number;
    timestamp: string;
  };
}
