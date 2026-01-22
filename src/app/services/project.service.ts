import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Detail } from '../components/interface/detail.model';
import { Material } from '../components/interface/material.model';
import { ProjectCost } from '../components/interface/ProjectCost';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private detailsSubject = new BehaviorSubject<Detail[]>([]);
  details$ = this.detailsSubject.asObservable();

  private materialSubject = new BehaviorSubject<Material | null>(null);
  material$ = this.materialSubject.asObservable();

  get details(): Detail[] {
    return this.detailsSubject.value;
  }

  get material(): Material | null {
    return this.materialSubject.value;
  }

  addDetail(detail: Partial<Detail>) {
    const newDetail: Detail = {
      id: Date.now(),
      width: detail.width!,
      height: detail.height!,
      qty: detail.qty ?? 1,
      name: detail.name ?? 'Деталь',
      x: 0,
      y: 0,
      sheet: 0,
      color: '#3b82f6',
      locked: false,
    };

    this.detailsSubject.next([...this.details, newDetail]);
  }

  calculateCutting(material: Material): Detail[] {
    this.materialSubject.next(material);
    const GAP = 10;
    const updated: Detail[] = [];
    let currentSheet = 0;
    let x = 0;
    let y = 0;
    let rowHeight = 0;
    this.details.forEach(detail => {
      for (let i = 0; i < detail.qty; i++) {
        const placedDetail: Detail = { ...detail, qty: 1 };
        const w = placedDetail.width;
        const h = placedDetail.height;

        if (x + w > material.length) {
          x = 0;
          y += rowHeight + GAP;
          rowHeight = 0;
        }

        if (y + h > material.width) {
          currentSheet++;
          x = 0;
          y = 0;
          rowHeight = 0;
        }

        placedDetail.x = x;
        placedDetail.y = y;
        placedDetail.sheet = currentSheet;

        updated.push(placedDetail);
        x += w + GAP;
        rowHeight = Math.max(rowHeight, h);
      }
    });

    this.detailsSubject.next(updated);
    return updated;
  }

  calculateProjectCost(): ProjectCost {
    const material = this.material;
    if (!material || this.details.length === 0) {
      return { material: 0, cutting: 0, edge: 0, waste: 0, labor: 0, markupPercent: 30 };
    }

    const sheets: { [key: number]: Detail[] } = {};
    this.details.forEach(d => {
      const sheet = d.sheet ?? 0;
      if (!sheets[sheet]) sheets[sheet] = [];
      sheets[sheet].push(d);
    });

    let totalAccountedArea = 0;
    let totalUsedArea = 0;
    const sheetKeys = Object.keys(sheets).map(Number);

    sheetKeys.forEach(sheet => {
      const sheetDetails = sheets[sheet];
      let maxX = 0;
      let maxY = 0;
      sheetDetails.forEach(d => {
        if (d.x === undefined || d.y === undefined) return;
        maxX = Math.max(maxX, d.x + d.width);
        maxY = Math.max(maxY, d.y + d.height);
        totalUsedArea += d.width * d.height;
      });

      const stepLength = material.stepLength ?? 0;
      const stepWidth = material.stepWidth ?? 0;

      const accountedX = stepLength > 0 ? Math.ceil(maxX / stepLength) * stepLength : maxX;
      const accountedY = stepWidth > 0 ? Math.ceil(maxY / stepWidth) * stepWidth : maxY;

      totalAccountedArea += accountedX * accountedY;
    });

    const materialPricePerMm2 = 0.01;
    const cuttingCostPerDetail = 100;
    const edgeCostPerDetail = 50;
    const laborPerDetail = 20;

    const materialCost = totalAccountedArea * materialPricePerMm2;
    const wasteArea = totalAccountedArea - totalUsedArea;
    const wasteCost = wasteArea * materialPricePerMm2;
    const numDetails = this.details.length;
    const cuttingCost = numDetails * cuttingCostPerDetail;
    const edgeCost = numDetails * edgeCostPerDetail;
    const laborCost = numDetails * laborPerDetail;

    return {
      material: materialCost,
      cutting: cuttingCost,
      edge: edgeCost,
      waste: wasteCost,
      labor: laborCost,
      markupPercent: 30,
    };
  }

  removeDetail(detail: Detail) {
    this.detailsSubject.next(this.details.filter((d) => d.id !== detail.id));
  }

  toggleLock(detail: Detail) {
    const updated = this.details.map(d =>{
      d.id === detail.id ? { ...d, locked: !d.locked } : d
      return d;
    });
    this.detailsSubject.next(updated);
  }

  optimizeAll() {
    const sortedDetails = [...this.details].sort((a, b) => b.height - a.height);
    this.detailsSubject.next(sortedDetails);
  }

  optimizeDetail(detail: Detail) {
    const updated = this.details.map((d) =>
      d.id === detail.id ? { ...d, color: '#f59e0b' } : d,
    );
    this.detailsSubject.next(updated);
  }


  clear() {
    this.detailsSubject.next([]);
    this.materialSubject.next(null);
  }

  updateDetails(details: Detail[]) {
    this.detailsSubject.next(details);
  }
}
