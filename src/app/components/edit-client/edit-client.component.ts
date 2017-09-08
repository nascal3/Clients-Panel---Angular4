import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      balance: 0
  };

  disableBalanceOnEdit = true;

  constructor(
    public clientService: ClientService,
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public route: ActivatedRoute,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    this.id = this.route.snapshot.params['id'];
     // Get client
    this.clientService.getClient(this.id).subscribe( client => {
      this.client = client;
      // console.log(this.client);
    });
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (!valid) {
      this.flashMessagesService.show('Please fill in the form corectly', {cssClass: 'alert alert-danger', timeout: 4000});
      this.router.navigate(['edit-client/' + this.id]);
    }else {
      //update client
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('Client updated', {cssClass: 'alert alert-success', timeout: 4000});
      this.router.navigate(['/client/' + this.id]);
    }
  }
}
