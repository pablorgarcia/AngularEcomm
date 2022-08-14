import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

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
    private fb: UntypedFormBuilder,
    private readonly chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.msgForm = this.fb.group({
      msgControl: ['', Validators.required]
    });

    this.chats$ = this.chatService.loadMessages();
  }

  sendMessage(): void {
    this.chatService.addMessage(this.msgForm.value.msgControl);
    console.log(this.msgForm.value);
    this.msgForm.reset();
  }

}
