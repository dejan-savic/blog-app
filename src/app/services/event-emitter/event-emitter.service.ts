import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  @Output() public notificationEvent = new EventEmitter<string>();
  @Output() public searchEvent = new EventEmitter<string>();

  constructor() { }
}
