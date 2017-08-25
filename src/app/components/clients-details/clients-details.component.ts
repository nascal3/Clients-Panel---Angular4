import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/client';

@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.css']
})
export class ClientsDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    public clientService: ClientService,
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Get id
    this.id = this.route.snapshot.params['id'];

    // Get client
    this.clientService.getClient(this.id).subscribe( client => {
      if (client.balance > 0) {
        this.hasBalance = true;
      }
      this.client = client;
      // console.log(this.client);
    });
  }

  updateBalance(id: string) {
    // Update client balance
    this.clientService.updateClient(id, this.client);
    this.flashMessagesService.show('Balance update', {cssClass: 'alert-successs', timeout: 4000});
    this.router.navigate(['/client/' + this.id]);
  }

}
