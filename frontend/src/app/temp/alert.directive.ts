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
  alertComponentRef: any;

  ngOnInit() {
    this.errorSubscription = this.errors$.subscribe(error => {
      console.log
      if(!this.alertComponentRef){ 
        console.log('here') 
        this.alertComponentRef = this.createAlert(error);
      }

      console.log('I\'M HERE BITCHES', this.alertComponentRef.instance)
      this.alertComponentRef.instance.errorMessage = error;

      // setTimeout(() => {
      //   if (!this.keptComponents.includes(this.alertComponentRef)) {
      //     this.alertComponentRef = null;
      //     this.alertComponentRef.destroy();
      //   }
      // }, 7000)
    });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  private createAlert(error: string): ComponentRef<AlertComponent> {
    const factory = this.cfr.resolveComponentFactory(AlertComponent);
    const componentRef = this.vcr.createComponent(factory);

    
    componentRef.instance.closed.subscribe(() => {
      // this.keptComponents = this.keptComponents.filter(ref => ref !== componentRef);
      // componentRef.hostView.destroy();

      this.alertComponentRef.hostView.destroy();
      this.alertComponentRef = null;
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
