export interface Detail {
  id: number;
  width: number;
  height: number;
  qty: number;
  name: string;
  note?: string;
  x?: number;
  y?: number;
  sheet?: number;
  rotated?: boolean;
  color?: string;
  locked?: boolean;
}
