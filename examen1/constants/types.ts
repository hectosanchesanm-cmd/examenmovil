export interface Task {
  id: string;
  title: string;
  completed: boolean;
  user: string;
  photouri?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
