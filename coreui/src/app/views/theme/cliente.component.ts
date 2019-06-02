import { Component, OnInit, Inject, ViewChild, ElementRef,  ChangeDetectorRef} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { ClienteModel } from './cliente.Model';
import { ClienteService } from './cliente.service';
import { ModalDirective} from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';



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
  displayedColumns: string[] = ['id_cli', 'cod_cli', 'nombre'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('infoModal') public infoModal: ModalDirective;
  dataSource: any;


  constructor(@Inject(DOCUMENT) private _document: any, clienteService: ClienteService, private changeDetectorRefs: ChangeDetectorRef) {
    this._clienteService = clienteService;

  }
  
  ngOnInit(): void {
    this.genGrid();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  genGrid() 
  {
    this._clienteService.GetAll().subscribe(
        allcliente => {
            this.ClienteList = allcliente
            console.log(this.ClienteList);
            this.dataSource = new MatTableDataSource(this.ClienteList);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
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
      this._clienteService.Update(this.ClienteModel).subscribe(
        cliente => {
            console.log(cliente);
            this.refresh();
          },
        error => this.errorMessage = <any>error
      );
  
    } else {
      this._clienteService.Add(this.ClienteModel).subscribe(
        cliente => {
            console.log(cliente);
            this.refresh();
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
}


