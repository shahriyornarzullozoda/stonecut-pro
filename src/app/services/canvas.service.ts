import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Detail } from '../components/interface/detail.model';

export interface CanvasState {
  zoom: number;
  offsetX: number;
  offsetY: number;
  selectedDetailId?: number;
}

@Injectable({ providedIn: 'root' })
export class CanvasService {
  private _canvas$ = new BehaviorSubject<CanvasState>({ zoom: 1, offsetX: 0, offsetY: 0 });
  canvas$ = this._canvas$.asObservable();

  private _details$ = new BehaviorSubject<Detail[]>([]);
  details$ = this._details$.asObservable();

  addDetail(detail: Detail) {
    detail.x = 0;
    detail.y = 0;
    this._details$.next([...this._details$.value, detail]);
  }

  zoomIn() { this.updateZoom(this._canvas$.value.zoom + 0.1); }
  zoomOut() { this.updateZoom(this._canvas$.value.zoom - 0.1); }
  resetView() { this._canvas$.next({ zoom: 1, offsetX: 0, offsetY: 0 }); }

  move(dx: number, dy: number) {
    const state = this._canvas$.value;
    this._canvas$.next({ ...state, offsetX: state.offsetX + dx, offsetY: state.offsetY + dy });
  }

  private updateZoom(zoom: number) {
    this._canvas$.next({ ...this._canvas$.value, zoom });
  }
}

