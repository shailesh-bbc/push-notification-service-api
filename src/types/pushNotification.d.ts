export type NoteRequestData = {
  type: string;
  title?: string;
  body?: string;
};

export type LinkRequestData = {
  type: string;
  title?: string;
  body?: string;
  url?: string;
};

export type RequestData = NoteRequestData | LinkRequestData;
