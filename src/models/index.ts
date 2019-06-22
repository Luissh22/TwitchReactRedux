export interface Stream {
  id: number;
  title: string;
  description: string;
  userId: string;
}

export interface StreamFormValues {
  title?: string;
  description?: string;
}

export interface StreamRouteParams {
  id: string;
}
