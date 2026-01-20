import { Injectable } from '@angular/core';
import { Detail } from '../components/interface/detail.model';
import { CostParams, CostResult } from '../components/interface/CostParams';

@Injectable({
  providedIn: 'root'
})
export class CostService {

  SHEET_AREA = 2550 * 1250;

  calculate(
    details: Detail[],
    totalSheets: number,
    params: CostParams
  ): CostResult {

    const material = totalSheets * params.sheetPrice;

    const cutting = details.reduce(
      (sum, d) => sum + ((d.width + d.height) * 2 * d.qty) * params.cuttingPrice,
      0
    );

    const edge = details.reduce(
      (sum, d) => sum + ((d.width + d.height) * 2 * d.qty) * params.edgePrice,
      0
    );

    const labor = params.laborPrice;

    const usedArea = details.reduce(
      (sum, d) => sum + d.width * d.height * d.qty,
      0
    );

    const waste = ((totalSheets * this.SHEET_AREA - usedArea) / this.SHEET_AREA)
      * params.sheetPrice;

    const totalCost = material + cutting + edge + labor + waste;
    const markup = totalCost * (params.markupPercent / 100);
    const finalPrice = totalCost + markup;

    return {
      material,
      cutting,
      edge,
      waste,
      labor,
      totalCost,
      markup,
      finalPrice
    };
  }
}
