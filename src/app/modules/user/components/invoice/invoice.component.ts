import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComponentAbstract} from '../../../../api/component';
import {Invoice} from '../../../../interfaces/invoice';
import {NotifierService} from 'angular-notifier';
import {InvoiceService} from '../../../../services/invoice.service';
import {ApiFilesService} from '../../../../services/api-files.service';
import {Utils} from '../../../../shared/utils';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent extends ComponentAbstract implements OnInit, OnDestroy {

  case = 'Nueva';
  title = 'Factura';
  item: Invoice;
  uploadedFiles: Array <File>
  tokenApiFiles: string
  imageURL: any

  constructor(public is: InvoiceService, private ns: NotifierService, private afs: ApiFilesService,
              private domSanitizer: DomSanitizer) {
    super(is, ns);
  }

  ngOnInit(): void {
    this.loginApiFiles()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
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
    this.afs.getInvoice(this.tokenApiFiles, idImage).subscribe((res) => {
      console.log(res)
      const TYPED_ARRAY = new Uint8Array(res)
      const blob = new Blob( [ TYPED_ARRAY ], { type: 'image/jpeg' } );
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL( blob );
      this.imageURL = imageUrl
    })
  }

  edit(item: any): void {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
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
