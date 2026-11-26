import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { map, switchMap, timer } from 'rxjs';
import { OrderService } from '@shopflow/data-access';

@Component({
  selector: 'app-live-orders',
  imports: [AsyncPipe, CurrencyPipe, DatePipe],
  templateUrl: './live-orders.html',
})
export class LiveOrders {
  private readonly orderService = inject(OrderService);
  private readonly cdr = inject(ChangeDetectorRef);
  protected fige = false;

  protected readonly flux$ = timer(0, 5000).pipe(
    map((n) => ((n + 1) * 5) % 200),
    switchMap((position) => this.orderService.latest(position)),
    map((page) => ({ commandes: page.carts, date: new Date() })),
  );

  protected basculer(): void {
    this.fige = !this.fige;
    if (this.fige) {
      this.cdr.detach();
      this.cdr.detectChanges();
    } else {
      this.cdr.reattach();
    }
  }

  protected actualiser(): void {
    this.cdr.detectChanges();
  }
}
