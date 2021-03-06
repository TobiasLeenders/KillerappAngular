import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ScheduleActivities} from './ScheduleActivities';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ActivitiesComponent implements OnInit {

  public schedulelist: string[] = [];
  public schedulenamelist: string[] = [];
  public schedule: ScheduleActivities;
  public schedulesArray: any;

  constructor(private http: HttpClient) {
    this.getSchedules();
  }

  ngOnInit() {

  }

  getSchedules() {
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
    const req = this.http.get('http://' + location.hostname + ':9998/api/getSchedules/' + sessionStorage.getItem('userid'), httpOptions)
      /*.pipe(
        map((res: Response) => res.json())
      )*/
      .subscribe(res => {
          console.log(res);
          const num = 0;
          let i: number;

          for (i = num; i < res['length']; i++) {
            this.schedulelist.push(res[i]['ScheduleId']);
            this.schedulenamelist.push(res[i]['ScheduleName']);
          }
          console.log(this.schedulenamelist);
          console.log(this.schedulelist);
          // const jsonresult = JSON.parse(res.toString());
          /*this.schedulelist = res as ScheduleActivities[];
          console.log(res);
          console.log(this.schedulelist);
          return res;*/
        }
      );
  }

  newActivity() {

    const activities = ['a', 'b', 'c'];
    const categories = ['cat1', 'cat2', 'cat3'];
    const body = new HttpParams()
      .set('schedulename', 'TestSchedule')
      .set('duration', '10')
      .set('activities', activities.toString())
      .set('categories', categories.toString());
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
    const req = this.http.post('http://' + location.hostname + ':9998/api/newSchedule', body, httpOptions)
      .subscribe(
        res => {
      console.log(res);
    }
  );
  }

}
