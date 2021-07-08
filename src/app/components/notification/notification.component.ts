import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  message: string
  showNotification: boolean;
  notificationSubscriber: Subscription = new Subscription;

  constructor(private eventEmitterSvc: EventEmitterService) {
    this.message = 'No new messages.'
    this.showNotification = true;
  }

  ngOnInit(): void {
    this.notificationSubscriber = this.eventEmitterSvc.notificationEvent.subscribe(data => {
      this.showNotificationMessage(data);
    })
  }

  ngOnDestroy(): void {
    this.notificationSubscriber.unsubscribe();
  }

  closeNotification() {
    this.showNotification = !this.showNotification;
  }

  showNotificationMessage(message: string = 'No new messages.') {
    this.message = message;
    this.showNotification = true;
  }

}
