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
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName} from '@angular/forms';
import { ValidationFormsService } from './cliente.Validation.service';

import { ValidatorFn, ValidationErrors } from '@angular/forms';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'cliente',
  styleUrls: ['cliente.css'],
  templateUrl: 'cliente.html',
  providers: [ ValidationFormsService ]
})

export class ClienteComponent  implements OnInit {

  
  private _clienteService;
  rowInfo: any;
  ClienteList: ClienteModel[];
  ClienteModel: ClienteModel= new ClienteModel();
  output: any;
  errorMessage: any;
  @ViewChild('TABLE') table: ElementRef;
  displayedColumns: string[] = ['select', 'nombre'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('infoModal') public infoModal: ModalDirective;
  dataSource: any;
  selection = new SelectionModel<ClienteModel>(true, []);
  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;

  constructor(@Inject(DOCUMENT) private _document: any, clienteService: ClienteService, 
  private changeDetectorRefs: ChangeDetectorRef, private ngxService: NgxUiLoaderService,
  private fb: FormBuilder,  public vf: ValidationFormsService) {

    this._clienteService = clienteService;
    this.formErrors = this.vf.errorMessages;

    this.createForm();

  }
  
  ngOnInit(): void {
    this.genGrid();
    this.onReset();
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
    this.onReset();
    this.ClienteModel.id_cli = 0;
    this.ClienteModel.cod_cli = "";
    this.ClienteModel.nombre = "";
    this.ClienteModel.nro_doc = "";
    this.infoModal.show();

  }

  // On Submit
  onSubmit() {

    this.submitted = true;
  
    // stop here if form is invalid
    if (this.simpleForm.invalid) {
      return;
    }

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
          this.ClienteModel.nro_doc = cliente.nro_doc;
          console.log(this.ClienteModel);
        },
      error => this.errorMessage = <any>error
    );

    console.log(row);
    this.onReset();
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


  //Form Validation functions

  createForm() {
    this.simpleForm = this.fb.group({
      id_cli: ['', [Validators.nullValidator]],
      cod_cli: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      nro_doc: ['', [Validators.nullValidator]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.simpleForm.controls; }

  onReset() {

    this.submitted = false;
    this.simpleForm.reset();

  } 
}


