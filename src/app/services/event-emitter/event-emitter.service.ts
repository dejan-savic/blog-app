import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  @Output() notificationEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
}
