import { ComponentFactoryResolver, ComponentRef, Directive, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { AlertComponent } from './alert/alert.component';

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective implements OnDestroy {

  constructor(private alertService: AlertService, private vcr: ViewContainerRef, private cfr: ComponentFactoryResolver) {
  }

  errors$ = this.alertService.getError();
  keptComponents: ComponentRef<AlertComponent>[] = [];
  errorSubscription: Subscription;

  ngOnInit() {
    this.errorSubscription = this.errors$.subscribe(error => {
      const ref = this.createAlert(error);

      setTimeout(() => {
        if (!this.keptComponents.includes(ref)) ref.destroy();
      }, 5000)
    });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  private createAlert(error: string): ComponentRef<AlertComponent> {
    const factory = this.cfr.resolveComponentFactory(AlertComponent);
    const componentRef = this.vcr.createComponent(factory);

    componentRef.instance.errorMessage = error;
    
    componentRef.instance.closed.subscribe(() => {
      this.keptComponents = this.keptComponents.filter(ref => ref !== componentRef);
      componentRef.hostView.destroy();
    });
    componentRef.instance.focused.pipe(
      take(1)
    ).subscribe(() => this.preventFromDestruction(componentRef));

    return componentRef;
  }

  private preventFromDestruction(ref: ComponentRef<AlertComponent>): void {
    this.keptComponents.push(ref);
  }

}
