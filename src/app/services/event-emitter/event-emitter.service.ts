import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  @Output() public notificationEvent = new EventEmitter<string>();

  constructor() { }
}
