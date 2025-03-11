import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filters = new BehaviorSubject<any>({});
  filters$ = this.filters.asObservable();

  setFilters(filters: any) {
    this.filters.next(filters);
  }
}
