import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit, Inject, ViewChild, ElementRef,  ChangeDetectorRef} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { CliAbonModel } from './cliabon.Model';
import { CliAbonService } from './cliabon.service';
import { ProductoModel } from './producto.Model';
import { ProductoService } from './producto.service';
import { ClienteModel } from './cliente.Model';
import { ClienteService } from './cliente.service';

import { ModalDirective} from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'cliabon',
  styleUrls: ['cliabon.css'],
  templateUrl: 'cliabon.html'
})

export class CliAbonComponent  implements OnInit {

  private _cliabonService;
  private _productoService;
  private _clienteService;
  rowInfo: any;
  CliAbonList: CliAbonModel[];
  CliAbonModel: CliAbonModel= new CliAbonModel();
  ProductoList: ProductoModel[];
  ProductoModel: ProductoModel= new ProductoModel();
  ClienteList: ClienteModel[];
  ClienteModel: ClienteModel= new ClienteModel();

  output: any;
  errorMessage: any;
  @ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['select','cod_cli', 'nombre', 'cod_prod', 'descrip', 'cantidad', 'precio', 'observ'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('infoModal') public infoModal: ModalDirective;
  dataSource: any;
  selection = new SelectionModel<CliAbonModel>(true, []);

  constructor(@Inject(DOCUMENT) private _document: any, CliAbonService: CliAbonService, 
  ProductoService: ProductoService, ClienteService: ClienteService, 
  private changeDetectorRefs: ChangeDetectorRef, private ngxService: NgxUiLoaderService) {

    this._cliabonService = CliAbonService;
    this._productoService = ProductoService;
    this._clienteService = ClienteService;
    this.CliAbonList = [];
    this.ProductoList = [];
    this.ClienteList = [];
  }
  
  ngOnInit(): void {
    this.getCliente();
    this.getProducto();
    this.genGrid();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  search() {
    alert('test');
  }

  getCliente() 
  {
    this.ngxService.start();
    this._clienteService.GetAll().subscribe(
        allcli => {
            this.ClienteList = allcli
            console.log(this.ClienteList);
            this.ngxService.stop(); 
          },
        error => this.errorMessage = <any>error
    );
  }

  getProducto() 
  {
    this.ngxService.start();
    this._productoService.GetAll().subscribe(
        allprod => {
            this.ProductoList = allprod
            console.log(this.ProductoList);
            this.ngxService.stop(); 
          },
        error => this.errorMessage = <any>error
    );

  }

  genGrid() 
  {
    this.ngxService.start();
    this._cliabonService.GetAll().subscribe(
        allcliente => {
            this.CliAbonList = allcliente
            console.log(this.CliAbonList);
            this.dataSource = new MatTableDataSource(this.CliAbonList);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.ngxService.stop(); 
          },
        error => this.errorMessage = <any>error
    );

  }


  nuevoProducto() {
    
  }

  nuevoCliente() {

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
   this.CliAbonModel.id_abon = 0;
   this.CliAbonModel.id_cli = 0;
   this.CliAbonModel.id_prod = 0;
   this.CliAbonModel.iobserv = "";
   this.CliAbonModel.cantidad = 0;
   this.CliAbonModel.precio = 0;
   this.infoModal.show();

  }

  // On Submit
  onSubmit() {
    if (this.CliAbonModel.id_abon != 0) {
      this.ngxService.start();
      this._cliabonService.Update(this.CliAbonModel).subscribe(
        cliabon => {
            console.log(cliabon);
            this.refresh();
            this.ngxService.stop();
          },
        error => this.errorMessage = <any>error
      );
  
    } else {
      this.ngxService.start();
      this._cliabonService.Add(this.CliAbonModel).subscribe(
        cliabon => {
            console.log(cliabon);
            this.refresh();
            this.ngxService.stop();
          },
        error => this.errorMessage = <any>error
      );  
    }
    console.log(this.CliAbonModel);
    this.infoModal.hide();
    //this.genGrid();

  }



  refresh() {
    this.genGrid();
  }

  selectRow(row) {
    this._cliabonService.GetById(row.id_abon).subscribe(
      CliAbon => {
          this.CliAbonModel.id_abon = CliAbon.id_abon;
          this.CliAbonModel.id_cli = CliAbon.id_cli;
          this.CliAbonModel.id_prod = CliAbon.id_prod;
          this.CliAbonModel.cantidad = CliAbon.cantidad;
          this.CliAbonModel.precio = CliAbon.precio;
          this.CliAbonModel.iobserv = CliAbon.iobserv;
          console.log(this.CliAbonModel);
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
        this._cliabonService.Delete(element.id_abon).subscribe(
          CliAbon => {
              console.log(CliAbon);
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
    checkboxLabel(row?: CliAbonModel): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_abon + 1}`;
    }
}
