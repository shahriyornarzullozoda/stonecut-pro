export interface CuttingSettings {
  kerf: number;      
  padding: number;     
  speed: number;     
  allowRotate: boolean;
  showGrid: boolean;
  showSizes: boolean;
}
export type CuttingAlgorithm = 'FAST' | 'DENSE';

