import { Component, OnInit } from '@angular/core';
import { MarvelApiService } from '../../services/services/marvel-api.service';
import { ApiRequestLogResponse } from 'src/app/services/models/Api-Request-Log-Response';

@Component({
  selector: 'app-request-log',
  templateUrl: './request-log.component.html',
  styleUrls: ['./request-log.component.scss']
})
export class RequestLogComponent implements OnInit {

requestLogs: ApiRequestLogResponse[] = [];


  constructor(private marvelApiService: MarvelApiService) { }

  ngOnInit(): void {
    this.getApiRequestLogs();
  }

  getApiRequestLogs(): void {
    this.marvelApiService.getAllApiRequestLog().subscribe({
      next: (response: ApiRequestLogResponse) => {
        if (response) {
          this.requestLogs = response as ApiRequestLogResponse[];
          console.log('API Request Logs:', this.requestLogs);
        }
      },
      error: (error) => {
        console.error('Error fetching API request logs:', error);
      }
    });
  }
}



