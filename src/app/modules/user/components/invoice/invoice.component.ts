import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComponentAbstract} from '../../../../api/component';
import {Invoice} from '../../../../interfaces/invoice';
import {NotifierService} from 'angular-notifier';
import {InvoiceService} from '../../../../services/invoice.service';
import {ApiFilesService} from '../../../../services/api-files.service';
import {Utils} from '../../../../shared/utils';
import {Provider} from '../../../../interfaces/provider';
import {ProviderService} from '../../../../services/provider.service';
import {Store} from '@ngrx/store';
import {SEARCH} from '../../../../store/search/search.reducer';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent extends ComponentAbstract implements OnInit, OnDestroy {

  case = 'Nueva';
  title = 'Factura';
  item: Invoice;
  from: string;
  to: string;
  uploadedFiles: Array <File>
  tokenApiFiles: string
  imageURL: any
  providers: Provider[] = [];
  temp: Invoice[] = []
  invoices: Invoice[] = []

  constructor(public is: InvoiceService, private ns: NotifierService, private afs: ApiFilesService,
              private pds: ProviderService, private store: Store<any>) {
    super(is, ns);
    this.subscription.add(store.select(SEARCH).subscribe(data => {
      let text = 'all';
      if (data !== ''){
        text = data;
      }
      this.search(text);
    }));
  }

  ngOnInit(): void {
    this.loginApiFiles()
    this.getProviders()
    this.getDateToday()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getItems(): void {
    this.subscription.add(this.service.getItems().subscribe(() => {
      this.invoices = this.service.items
      this.temp = this.invoices
    }));
  }

  search(val: string): void {
    this.invoices = this.temp;
    if (val !== 'all') {
      this.invoices = this.invoices.filter(data => data.name.toLowerCase().indexOf(val) !== -1 || !val);
    }
  }

  private getDateToday(): void {
    this.from = Utils.dateString(1);
    this.to = Utils.dateString();
  }

  private getProviders(): void {
    this.subscription.add(this.pds.getItems().subscribe(() => {
      this.providers = this.pds.items;
    }));
  }

  updateDate(): void {

  }

  fileChange(element): void {
    this.uploadedFiles = element.target.files;
  }

  loginApiFiles(): void {
    this.afs.loginApiFiles().subscribe(() => {
      this.tokenApiFiles = this.afs.token
    })
  }

  uploadInvoice(): Promise<any> {
    this.ns.notify('success', 'Subiendo Factura...')
    return new Promise<any>((resolve, reject) => {
      this.afs.uploadInvoice(this.uploadedFiles[0], this.tokenApiFiles).subscribe((res) => {
        resolve(res.file)
      })
    })
  }

  showInvoice(idImage: string): void {
    this.imageURL = 'http://localhost:2000/invoice/?name=' + idImage + '&token=' + this.tokenApiFiles
  }

  edit(item: any): void {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
    this.item.date = Utils.dateToString(new Date(this.item.date))
  }

  sendForm(): void {
    this.uploadInvoice().then((e) => {
      this.item.idImage = e
      this.addItem(this.item)
    })
  }

  resetItem(): void {
    this.item = {
      name: '',
      code: '',
      date: Utils.dateString(),
    };
  }

}
