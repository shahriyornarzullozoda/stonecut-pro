export interface ProjectCost {
  material: number;
  cutting: number;
  edge: number;
  waste: number;
  labor: number;
  markupPercent: number;
}
export interface ProjectMetrics {
  sheets: number;
  details: number;
  efficiency: number;
  waste: number;
}

export interface CostDistribution {
  material: number;
  processing: number;
  other: number;
}
