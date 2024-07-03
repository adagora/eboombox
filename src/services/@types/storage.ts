export interface UploadRequest {
  file: File;
  filename?: string;
  visibility?: "private" | "public";
  password?: string;
  index_listing?: boolean;
  directoryId?: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    client_id: string;
    parent_directory_id: string;
    availability: string;
    visibility: string;
    region: string;
    name: string;
    shards_info: Array<any>;
    path: string;
    unique_id: string;
    file_size_byte_native: number;
    file_size_byte_encrypted: number;
    index_listing: boolean;
    shared_detail: {
      [key: string]: any;
    };
    client_ids: Array<string>;
    shared_mode: string;
    shared_count: number;
    _id: string;
    created_at: string;
    updated_at: string;
    __v: number;
  };
}

export interface ShareResponse {
  success: boolean;
  data: {
    baseShareableLink: string;
    concatenator: string;
    key: string;
  };
}

interface ShardInfo {
  file_index: string;
  filename_hash: string;
  file_hash: string;
  shard_size: number;
  nodeId: string;
}

interface SharedDetail {
  client_ids: any[];
  shared_mode: string;
  shared_count: number;
}

interface IFile {
  shared_detail: SharedDetail;
  _id: string;
  client_id: string;
  parent_directory_id: string | null;
  availability: string;
  visibility: string;
  region: string | null;
  name: string;
  shards_info: ShardInfo[];
  path: string;
  unique_id: string;
  file_size_byte_native: number;
  file_size_byte_encrypted: number;
  index_listing: boolean;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface FilterfilesResponse {
  success: boolean;
  data: {
    directories: any[];
    files: IFile[];
  };
}
