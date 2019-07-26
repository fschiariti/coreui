import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import { Router, ActivatedRoute } from '@angular/router';
import { FacturasPrintService } from './facturasprint.service';
import { FacturasModel } from './facturas.Model';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService



@Component({
    selector: 'facturas',
    styleUrls: [],
    templateUrl: 'facturasprint.html'
})

export class FacturasPrintComponent implements OnInit {

    private _facturasPrintService;
    facturasModel: FacturasModel= new FacturasModel();
    errorMessage: any;

    constructor(private _Route: Router, private _routeParams: ActivatedRoute, 
        facturasPrintService: FacturasPrintService, private ngxService: NgxUiLoaderService) {

        this._facturasPrintService = facturasPrintService;

    }

    ngOnInit(): void 
    {
       this.getData();
    }


    getData() 
    {
      this.ngxService.start();
      this._facturasPrintService.GetById(10025).subscribe(
          info => {
                this.facturasModel  = info;
                this.ngxService.stop(); 
            },
          error => this.errorMessage = <any>error
      );
  
    }
  


    public captureScreen() 
    {
        var data = document.getElementById('print');
        html2canvas(data).then(canvas => 
            {
            // Few necessary setting options
            var imgWidth = 180;
            var pageHeight = 297;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
            var position = 0;
            pdf.addImage(contentDataURL, 'PNG', 20, 20, imgWidth, imgHeight)
            pdf.save('factura.pdf'); // Generated PDF 

        });
    }

}