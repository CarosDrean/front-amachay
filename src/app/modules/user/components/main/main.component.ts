import {Component, OnDestroy, OnInit} from '@angular/core';
import * as feather from 'feather-icons';
import {Observable, of, Subscription} from "rxjs";
import {LoginService} from "../../../../services/login.service";
import {Utils} from "../../../../shared/utils";
import {UserService} from "../../../../services/user.service";
import {select, Store} from "@ngrx/store";
import {SearchAction} from "../../../../store/search/search.reducer";

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  user: Observable<string>;
  private subscription: Subscription;
  search: Observable<string>;

  constructor(private ls: LoginService, private us: UserService, private store: Store<any>) {
    this.search = store.pipe(select('search'));
  }

  ngOnInit(): void {
    feather.replace();
    Utils.loadScript();
    this.getUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  searchEvent(event: any): void {
    const action = new SearchAction(event.target.value.toLowerCase());
    this.store.dispatch(action);
  }

  private getUser(): void {
    const id = sessionStorage.getItem('_id');
    this.subscription = this.us.getItem(id).subscribe(() => {
      this.user = of(this.us.item.name);
    });
  }

  logOut(): void {
    this.ls.logOut();
  }

}
