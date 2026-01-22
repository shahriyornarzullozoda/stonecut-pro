export interface Material {
  id: number;
  name: string;
  length: number;
  width: number;
  thickness: number;
  stepLength?: number;
  stepWidth?: number;
  pricePerSheet: number;
}
export const MATERIALS: Material[] = [
  { id: 1, name: 'Акрил 3680x760 12мм', length: 3680, width: 760, thickness: 12, stepLength: 920, pricePerSheet: 28000 },
  { id: 2, name: 'Кварц 3200x1600 20мм', length: 3200, width: 1600, thickness: 20, stepWidth: 800, pricePerSheet: 54000 },
  { id: 3, name: 'Кварц 3000x1400 20мм', length: 3000, width: 1400, thickness: 20, stepWidth: 700, pricePerSheet: 52000 },
];

