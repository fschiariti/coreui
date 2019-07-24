import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './facturasprint.html',
    styleUrls: [
    ]
})

export class FacturasPrintComponent implements OnInit {
    private _generateRecepit;
    errorMessage: any;
    today :any;
    
    ngOnInit(): void 
    {

    }

    constructor(private _Route: Router, private _routeParams: ActivatedRoute) {
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
            pdf.save('PaymentRecepit.pdf'); // Generated PDF 

        });
    }


}