import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public message: string = '';
  public msgForm: UntypedFormGroup;
  chats$ : Observable<any>;
  user = JSON.parse(sessionStorage.getItem('user'));

  constructor(
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.msgForm = this.fb.group({
      msgControl: ['', Validators.required]
    })
  }

  sendMessage(): void {
    console.log('enviado');
  }

}
