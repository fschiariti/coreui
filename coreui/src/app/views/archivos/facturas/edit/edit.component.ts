import { SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import { Router, ActivatedRoute } from '@angular/router';
import { FacturasEditService } from './edit.service';
import { FacturasModel } from '../facturas.Model';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName} from '@angular/forms';
import { Observable} from 'rxjs';
import { ClienteModel } from '../../cliente/cliente.Model';
import { ValidationFormsService } from './edit.Validation.service';
import { map, startWith} from 'rxjs/operators';
import { ClienteService } from '../../cliente/cliente.service';



@Component({
    selector: 'edit',
    styleUrls: [],
    templateUrl: 'edit.html',
    providers: [ ValidationFormsService ]
})

export class FacturasEditComponent implements OnInit {
    private id_comp = 0;
    private _facturasEditService;
    private _clienteService;
    FacturasModel: FacturasModel= new FacturasModel();
    ClienteList: ClienteModel[];
    errorMessage: any;
    dataSource: any;
    displayedColumns: string[] = ['select','nombre'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    simpleForm: FormGroup;
    submitted = false;
    ClienteModel: ClienteModel= new ClienteModel();
    selection = new SelectionModel<FacturasModel>(true, []);


    constructor(private _Route: Router, private _routeParams: ActivatedRoute, ClienteService: ClienteService,
        facturasEditService: FacturasEditService, private ngxService: NgxUiLoaderService,
        private fb: FormBuilder,  public vf: ValidationFormsService) {
           
        this._facturasEditService = facturasEditService;
        this._clienteService = ClienteService;
        this.ClienteList = [];
        

            
        this.filteredClis = this.myControl.valueChanges
        .pipe(
        startWith(''),
        map(tabCliSearch => tabCliSearch ? this._filterClis(tabCliSearch) : this.ClienteList.slice()     
        )
        );
    
        this.createForm();
    }

    ngOnInit(): void 
    {
       this.id_comp = this._routeParams.snapshot.params['id_comp'];
       this.getCliente();
       this.getData();
    }

    myControl = new FormControl();
  
    filteredClis: Observable<ClienteModel[]>;
  
    private _filterClis(value: string): ClienteModel[] {
      const filterValue = value.toString().toLowerCase();
  
      return this.ClienteList.filter(tabCliSearch => tabCliSearch.cod_cli.toLowerCase().indexOf(filterValue) === 0 || tabCliSearch.nombre.toLowerCase().indexOf(filterValue) === 0);
      ;
    }
    
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    refresh() {
        this.getData();
      }

    getData() 
    {
      this.ngxService.start();
      this._facturasEditService.GetById(this.id_comp).subscribe(
          info => {
                this.FacturasModel = info
                this.dataSource = new MatTableDataSource(this.FacturasModel.items);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.ngxService.stop(); 
                this.ngxService.stop(); 
            },
          error => this.errorMessage = <any>error
      );
  
    }

    // On Submit
    onSubmit() {

        this.submitted = true;
    
        // stop here if form is invalid
        if (this.simpleForm.invalid) {
        return;
        }


        //identifica el id de cliente segun el cod_cli
        let data: any;

        let cod_cli = this.FacturasModel.cod_cli.trim();


        data = this.ClienteList.filter(function (item) {
        return item.cod_cli.includes(cod_cli.trim());
        });

        if (data.length > 0) {
        this.FacturasModel.id_cli =  data[0].id_cli;
        }
        //

        if (this.FacturasModel.id_comp != 0) {
        this.ngxService.start();
        this._facturasEditService.Update(this.FacturasModel).subscribe(
            cliabon => {
                console.log(cliabon);
                this.refresh();
                this.ngxService.stop();
            },
            error => this.errorMessage = <any>error
        );
    
        } else {
        this.ngxService.start();
        this._facturasEditService.Add(this.FacturasModel).subscribe(
            data => {
                console.log(data);
                this.ngxService.stop();
            },
            error => this.errorMessage = <any>error
        );  
        }
        console.log(this.FacturasModel);
    }

    cancel() {
        alert('cancel');
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
    checkboxLabel(row?: FacturasModel): string {
        if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_comp + 1}`;
    }


    //Form Validation functions
    
    createForm() {
        this.simpleForm = this.fb.group({
        cod_cli: ['', [Validators.required]],
        nombre: ['', [Validators.required]]
        });
    }

      // convenience getter for easy access to form fields
    get f() { return this.simpleForm.controls; }

    onReset() {

        this.submitted = false;
        this.simpleForm.reset();
    } 

    getCliente() 
    {
      this.ngxService.start();
      this._clienteService.GetAll().subscribe(
          allcli => {
              this.ClienteList = allcli
              console.log(this.ClienteList);
  
              let tmp = this.ClienteList.map(function (obj) {
                return obj.id_cli.toString();
              });
  
              this.ngxService.stop(); 
            },
          error => this.errorMessage = <any>error
      );
    }
  

}