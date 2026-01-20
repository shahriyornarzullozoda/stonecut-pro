import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Detail } from '../components/interface/detail.model';


@Injectable({ providedIn: 'root' })
export class ProjectService {

   private detailsSubject = new BehaviorSubject<Detail[]>([]);
  details$ = this.detailsSubject.asObservable();

  get details(): Detail[] {
    return this.detailsSubject.value;
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
      color: '#3b82f6',
      locked: false
    };

    this.detailsSubject.next([
      ...this.detailsSubject.value,
      newDetail
    ]);
  }
   removeDetail(detail: Detail) {
    this.detailsSubject.next(this.details.filter(d => d.id !== detail.id));
  }

  toggleLock(detail: Detail) {
    const updated = this.details.map(d => 
      d.id === detail.id ? { ...d, locked: !d.locked } : d
    );
    // this.detailsSubject.next(updated);
  }

  optimizeDetail(detail: Detail) {
    const updated = this.details.map(d => 
      d.id === detail.id ? { ...d, color: '#f59e0b' } : d
    );
    this.detailsSubject.next(updated);
  }
  calculateLayout() {
  const SHEET_WIDTH = 2550;
  const SHEET_HEIGHT = 1250;
  const GAP = 10;

  let x = 0;
  let y = 0;
  let rowHeight = 0;

  const updated: Detail[] = [];

  this.details.forEach(detail => {
    for (let i = 0; i < detail.qty; i++) {
      if (x + detail.width > SHEET_WIDTH) {
        x = 0;
        y += rowHeight + GAP;
        rowHeight = 0;
      }

      if (y + detail.height > SHEET_HEIGHT) {
        x = 0;
        y = 0;
        rowHeight = 0;
      }

      updated.push({
        ...detail,
        x,
        y
      });

      x += detail.width + GAP;
      rowHeight = Math.max(rowHeight, detail.height);
    }
  });

  this.detailsSubject.next(updated);
}



  clear() {
    this.detailsSubject.next([]);
  }
}