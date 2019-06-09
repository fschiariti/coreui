import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit, Inject, ViewChild, ElementRef,  ChangeDetectorRef} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { CliAbonModel } from './cliabon.Model';
import { CliAbonService } from './cliabon.service';
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
  rowInfo: any;
  CliAbonList: CliAbonModel[];
  CliAbonModel: CliAbonModel= new CliAbonModel();
  output: any;
  errorMessage: any;
  @ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['select','id_cli', 'cod_cli', 'nombre'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('infoModal') public infoModal: ModalDirective;
  dataSource: any;
  selection = new SelectionModel<CliAbonModel>(true, []);

  constructor(@Inject(DOCUMENT) private _document: any, CliAbonService: CliAbonService, 
  private changeDetectorRefs: ChangeDetectorRef, private ngxService: NgxUiLoaderService) {

    this._cliabonService = CliAbonService;
    this.CliAbonList = [];
  }
  
  ngOnInit(): void {
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
      this.dataSource = new MatTableDataSource(this.CliAbonList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

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
   // this.CliAbonModel.id_cli = 0;
   // this.CliAbonModel.cod_cli = "";
   // this.CliAbonModel.nombre = "";
    this.infoModal.show();

  }

  // On Submit
  onSubmit() {
    if (this.CliAbonModel.id_cli != 0) {

//      let x = this.CliAbonList;
  //    x.push(this.CliAbonModel);

      this.CliAbonList.push(this.CliAbonModel);
      this.refresh();
    }
    this.infoModal.hide();
  }

  refresh() {
    this.genGrid();
  }

  selectRow(row) {
    this._cliabonService.GetById(row.id_cli).subscribe(
      CliAbon => {
          this.CliAbonModel.id_cli = CliAbon.id_cli;
          this.CliAbonModel.cod_cli = CliAbon.cod_cli;
          this.CliAbonModel.nombre = CliAbon.nombre;
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
        this._cliabonService.Delete(element.id_cli).subscribe(
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
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_cli + 1}`;
    }
}


