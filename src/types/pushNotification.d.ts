export type NoteRequestBody = {
  type: string;
  title?: string;
  body?: string;
};

export type LinkRequestBody = {
  type: string;
  title?: string;
  body?: string;
  url?: string;
};

export type FileRequestBody = {
  type: string;
  fileType?: string;
  fileName?: string;
  fileUrl?: string;
  body?: string;
};

export type PushFileRequestBody = {
  type: string;
  file_type?: string;
  file_name?: string;
  file_url?: string;
  body?: string;
};

export type RequestData = NoteRequestBody | LinkRequestBody | PushFileRequestBody;
