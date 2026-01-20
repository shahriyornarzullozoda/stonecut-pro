export interface CostParams {
  sheetPrice: number;    
  cuttingPrice: number;    
  edgePrice: number;       
  laborPrice: number;     
  markupPercent: number;  
}

export interface CostResult {
  material: number;
  cutting: number;
  edge: number;
  waste: number;
  labor: number;
  totalCost: number;
  markup: number;
  finalPrice: number;
}