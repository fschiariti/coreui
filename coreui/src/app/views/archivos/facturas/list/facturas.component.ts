import { SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit, Inject, ViewChild, Input, ElementRef,  ChangeDetectorRef} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { FacturasModel } from '../facturas.Model';
import { FacturasService } from './facturas.service';
import * as XLSX from 'xlsx';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Observable} from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { ModalDirective} from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName} from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'facturas',
  styleUrls: ['facturas.css'],
  templateUrl: 'facturas.html'

})

export class FacturasComponent  implements OnInit {

  public showModal: boolean;
  private _facturasService;
  rowInfo: any;
  facturasList: FacturasModel[];
  facturasModel: FacturasModel= new FacturasModel();

    
  output: any;
  errorMessage: any;
  @ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['select','nombre'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('infoModal') public infoModal: ModalDirective;
  dataSource: any;
  selection = new SelectionModel<FacturasModel>(true, []);
  @Input() panelWidth: 5000;
  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;


  constructor(@Inject(DOCUMENT) private _document: any, facturasService: FacturasService, 
  private changeDetectorRefs: ChangeDetectorRef, private _Route: Router, private ngxService: NgxUiLoaderService) {

    this._facturasService = facturasService;
    this.facturasList = [];
    this.showModal = false;

  }

  ngOnInit(): void {
    this.genGrid();
  }

  genGrid() 
  {
    this.ngxService.start();
    this._facturasService.GetAll().subscribe(
        allcliente => {
            this.facturasList = allcliente
            console.log(this.facturasList);
            this.dataSource = new MatTableDataSource(this.facturasList);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.ngxService.stop(); 
          },
        error => this.errorMessage = <any>error
    );

  }



  ExportTOExcel() 
  {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      /* save to file */
      XLSX.writeFile(wb, 'Exportar.xlsx');
  }


  refresh() {
    this.genGrid();
  }


  imprimir() {
    let x = this.selection.selected;
    this.ngxService.start();

    x.forEach(element => {
      this._Route.navigate(['/archivos/facturas/print/',element.id_comp]);      
    });  
  }

  add() {
      this._Route.navigate(['/archivos/facturas/edit/',0]);      
  }

  eliminar() {
    if (confirm('Confirma?')) {
      let x = this.selection.selected;
      this.ngxService.start();
  
      x.forEach(element => {
        this._facturasService.Delete(element.id_comp).subscribe(
          facturas => {
              console.log(facturas);
            },
          error => this.errorMessage = <any>error
        );
        this.ngxService.stop();
        this.genGrid();
      });  
    }
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;      
    let numRows = 0;

    if (this.dataSource) {
      if (this.dataSource.data) {
        numRows = this.dataSource.data.length;
      } else {
        numRows = 0;
      }  
      numSelected === numRows;
    }
    else {
      numSelected === 0;
    }

    return numSelected;
  }

  closeModal() {
    this.showModal = false;
  //  this.infoModal.hide();
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: FacturasModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_comp + 1}`;
  }

  selectRow(row) {
    //alert(JSON.stringify(row));
    this._Route.navigate(['/archivos/facturas/edit/', row.id_comp]);      

  }

}

