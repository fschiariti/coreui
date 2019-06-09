import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit, Inject, ViewChild, ElementRef,  ChangeDetectorRef} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { ClienteModel } from './cliente.Model';
import { ClienteService } from './cliente.service';
import { ModalDirective} from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'cliente',
  styleUrls: ['cliente.css'],
  templateUrl: 'cliente.html'
})

export class ClienteComponent  implements OnInit {

  private _clienteService;
  rowInfo: any;
  ClienteList: ClienteModel[];
  ClienteModel: ClienteModel= new ClienteModel();
  output: any;
  errorMessage: any;
  @ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['select','id_cli', 'cod_cli', 'nombre', 'nro_doc'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('infoModal') public infoModal: ModalDirective;
  dataSource: any;
  selection = new SelectionModel<ClienteModel>(true, []);

  constructor(@Inject(DOCUMENT) private _document: any, clienteService: ClienteService, 
  private changeDetectorRefs: ChangeDetectorRef, private ngxService: NgxUiLoaderService) {

    this._clienteService = clienteService;

  }
  
  ngOnInit(): void {
//    this.dataSource.sort = this.sort;
    this.genGrid();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  search() {
    alert('test');
  }


  genGrid() 
  {
    this.ngxService.start();
    this._clienteService.GetAll().subscribe(
        allcliente => {
            this.ClienteList = allcliente
            console.log(this.ClienteList);
            this.dataSource = new MatTableDataSource(this.ClienteList);
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

  nuevo() {
    this.ClienteModel.id_cli = 0;
    this.ClienteModel.cod_cli = "";
    this.ClienteModel.nombre = "";
    this.infoModal.show();

  }

  // On Submit
  onSubmit() {
    if (this.ClienteModel.id_cli != 0) {
      this.ngxService.start();
      this._clienteService.Update(this.ClienteModel).subscribe(
        cliente => {
            console.log(cliente);
            this.refresh();
            this.ngxService.stop();
          },
        error => this.errorMessage = <any>error
      );
  
    } else {
      this.ngxService.start();
      this._clienteService.Add(this.ClienteModel).subscribe(
        cliente => {
            console.log(cliente);
            this.refresh();
            this.ngxService.stop();
          },
        error => this.errorMessage = <any>error
      );  
    }
    console.log(this.ClienteModel);
    this.infoModal.hide();
    //this.genGrid();

  }



  refresh() {
    this.genGrid();
//    this.dataSource = new MatTableDataSource(this.ClienteList);
//    this.changeDetectorRefs.detectChanges();
  }

  selectRow(row) {
    this._clienteService.GetById(row.id_cli).subscribe(
      cliente => {
          //this.ClienteRow = new cliente();
          this.ClienteModel.id_cli = cliente.id_cli;
          this.ClienteModel.cod_cli = cliente.cod_cli;
          this.ClienteModel.nombre = cliente.nombre;
          console.log(this.ClienteModel);
        },
      error => this.errorMessage = <any>error
    );

    console.log(row);
    this.infoModal.show();
  }

  eliminar() {
    if (confirm('Confirma?')) {
      let x = this.selection.selected;
      this.ngxService.start();
  
      x.forEach(element => {
        this._clienteService.Delete(element.id_cli).subscribe(
          cliente => {
              console.log(cliente);
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
      if (this.dataSource.data) {
        numRows = this.dataSource.data.length;
      } else {
        numRows = 0;
      }
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: ClienteModel): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_cli + 1}`;
    }
}


