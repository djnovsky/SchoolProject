import { Component, OnInit } from '@angular/core';
import { MarkControllerService } from 'src/app/services/mark-controller.service';
import { IMarkType } from 'src/app/models/mark-type.model';
import { Store, select } from '@ngrx/store';
import { marksSortByName } from 'src/app/store/marks/marks.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'webui-mark-controller',
  templateUrl: './mark-controller.component.html',
  styleUrls: ['./mark-controller.component.scss']
})
export class MarkControllerComponent implements OnInit {
  public getMarksList$: Observable<IMarkType[]>; // active marks
  public getMarksDisabled$: Observable<IMarkType[]>; // disable marks

  constructor(private markServ: MarkControllerService,
              private store: Store<object>) { }

  // requests by service
  getMarks(): void {
    this.markServ.getMarks();
  }
  postMark(data: IMarkType): void {
    this.markServ.postMark(data);
  }
  putMark(data: IMarkType): void {
    this.markServ.putMark(data);
  }
  // select data from store
  ngOnInit() {
    this.getMarksList$ = this.store.pipe(select(marksSortByName(true)));
    this.getMarksDisabled$ = this.store.pipe(select(marksSortByName(false)));
  }

}
