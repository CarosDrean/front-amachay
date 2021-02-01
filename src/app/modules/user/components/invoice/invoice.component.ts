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
import {environment} from '../../../../../environments/environment';

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
  sourceURL: string
  providers: Provider[] = [];
  temp: Invoice[] = []
  invoices: Invoice[] = []
  isImage = true
  searchTemp = ''
  filter = 'all'
  selectImg = false

  constructor(public is: InvoiceService, private ns: NotifierService, private afs: ApiFilesService,
              private pds: ProviderService, private store: Store<any>) {
    super(is, ns);
    this.loginApiFiles()
    this.subscription.add(store.select(SEARCH).subscribe(data => {
      let text = 'all';
      if (data !== ''){
        text = data;
        this.searchTemp = data
      }
      this.search(text);
    }));
  }

  ngOnInit(): void {
    this.getProviders()
    this.getDateToday()
    this.search(this.searchTemp)
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
    if (this.filter !== 'all') {
      this.invoices = this.invoices.filter(data => data.idProvider.toString() === this.filter)
    }

    if (val !== 'all') {
      this.invoices = this.invoices.filter(data =>
        data.name.toLowerCase().indexOf(val) !== -1 ||
        data.code.toLowerCase().indexOf(val) !== -1 || !val);
    }
    this.invoices = this.invoices.filter(e => {
      const date = new Date(e.date)
      const dateFrom = new Date(this.from + 'T00:00:00')
      const dateTo = new Date(this.to + 'T00:00:00')
      return date >= dateFrom && date <= dateTo
    })
  }

  /*updateDate(): void {
    this.invoices = this.temp
    this.invoices = this.invoices.filter(e => {
      const date = new Date(e.date)
      const dateFrom = new Date(this.from + 'T00:00:00')
      const dateTo = new Date(this.to + 'T00:00:00')
      return date >= dateFrom && date <= dateTo
    })
    console.log(this.invoices)
  }*/

  private getDateToday(): void {
    this.from = Utils.dateString(1);
    this.to = Utils.dateString();
  }

  private getProviders(): void {
    this.subscription.add(this.pds.getItems().subscribe(() => {
      this.providers = this.pds.items;
    }));
  }

  fileChange(element): void {
    this.selectImg = true
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

  showInvoice(idSource: string): void {
    this.isImage = true
    const endpointApiFiles = environment.api_files
    this.sourceURL = endpointApiFiles + '/invoice/?name=' + idSource + '&token=' + this.tokenApiFiles
    if (idSource.indexOf('.pdf') !== - 1) {
      this.isImage = false
    }
    this.afs.getInvoice(this.tokenApiFiles, idSource).subscribe()
  }

  edit(item: any): void {
    this.selectImg = false
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
    this.item.date = Utils.dateToString(new Date(this.item.date))
  }

  sendForm(): void {
    if (this.selectImg) {
      this.uploadInvoice().then((e) => {
        this.item.idImage = e
        this.addItem(this.item)
      })
    } else {
      this.addItem(this.item)
    }
  }

  resetItem(): void {
    this.item = {
      name: '',
      code: '',
      date: Utils.dateString(),
    };
  }

  deleteItem(): void {
    this.subscription.add(this.service.deleteItem(this.idDelete).subscribe((res) => {
      const invoice = this.invoices.find(e => e._id === +this.idDelete)
      if (invoice.idImage !== undefined) {
        this.afs.deleteInvoice(invoice.idImage, this.tokenApiFiles).subscribe()
      }
      const response = JSON.stringify(res);
      this.ns.notify('error', 'Eliminando...' );
      this.getItems();
      this.clean();
    }, error => {
      this.ns.notify('error', '¡Hubo un error al eliminar!' );
    }));
  }

}
