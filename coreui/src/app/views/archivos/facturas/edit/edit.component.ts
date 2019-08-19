import { SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit, ViewChild,  ChangeDetectorRef, ViewEncapsulation   } from '@angular/core';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import { Router, ActivatedRoute } from '@angular/router';
import { FacturasEditService } from './edit.service';
import { ProductoService } from '../../producto/producto.service';
import { ProductoModel } from '../../producto/producto.Model';
import { FacturasModel } from '../facturas.Model';
import { ItemsModel } from '../items.Model';
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
    styleUrls: [
      '../../../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
      '../../../../../scss/vendors/ng-select/ng-select.scss'
    ],
    templateUrl: 'edit.html',
    providers: [ ValidationFormsService ],
    encapsulation: ViewEncapsulation.None

})

export class FacturasEditComponent implements OnInit {
    private id_comp = 0;
    private _facturasEditService;
    private _clienteService;
    private _productoService;
    FacturasModel: FacturasModel= new FacturasModel();
    ItemsModel: ItemsModel= new ItemsModel();
    ClienteList: ClienteModel[];
    ProductoList: ProductoModel[];
    errorMessage: any;
    dataSource: any;
    displayedColumns: string[] = ['select','cod_prod','descrip', 'cantidad', 'precio'];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    simpleForm: FormGroup;
    submitted = false;
    showModal = false;
    ClienteModel: ClienteModel= new ClienteModel();
    selection = new SelectionModel<FacturasModel>(true, []);
    minDate = new Date(2017, 5, 10);
    maxDate = new Date(2030, 9, 15);
  
    bsValue: Date = new Date();


    constructor(private _Route: Router, private _routeParams: ActivatedRoute, ClienteService: ClienteService,
        FacturasEditService: FacturasEditService, ProductoService: ProductoService, private changeDetectorRefs: ChangeDetectorRef, 
        private ngxService: NgxUiLoaderService, private fb: FormBuilder,  public vf: ValidationFormsService) {
           
        this._facturasEditService = FacturasEditService;
        this._clienteService = ClienteService;
        this._productoService = ProductoService;
        this.ClienteList = [];
        this.ProductoList = [];
        this.FacturasModel.items= [];
                 
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
       this.getProducto();
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
      if (this.id_comp > 0 ){

        this._facturasEditService.GetById(this.id_comp).subscribe(
          info => {
                this.FacturasModel = info;
                this.dataSource = new MatTableDataSource(this.FacturasModel.items);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.ngxService.stop(); 
            },
          error => this.errorMessage = <any>error
        );
      }  
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
              resp => {
                  console.log(resp);
                  this.refresh();
                  this.ngxService.stop();
              },
              error => this.errorMessage = <any>error
          );
          console.log(this.FacturasModel);
    
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
          this._Route.navigate(['/archivos/facturas']);
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
        fecha: ['', [Validators.required]],
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
  
    selectRow(row) {
        this.ItemsModel = new ItemsModel;
        this.ItemsModel.index = row.index;
        this.ItemsModel.id_item = row.id_item;
        this.ItemsModel.id_prod =  row.id_prod;
        this.ItemsModel.cantidad =  row.cantidad;
        this.ItemsModel.precio =  row.precio;
        this.ItemsModel.iobserv =  row.iobserv;
        console.log(this.ItemsModel);
        error => this.errorMessage = <any>error
    
        console.log(row);
        this.showModal = true;
    }

    newItem() {
      this.ItemsModel = new ItemsModel;

      if (this.FacturasModel.items.length == 0) {
        this.ItemsModel.index = 1;
        this.ItemsModel.id_item = 0;
      } else {
        this.ItemsModel.index = 1 + Math.max.apply(Math,  this.FacturasModel.items.map(function(o) { return  o.index; }));
        this.ItemsModel.id_item = 0;
      }
      this.ItemsModel.id_prod =  0;
      this.ItemsModel.cantidad =  1;
      this.ItemsModel.precio =  0;
      this.ItemsModel.iobserv =  "";
      this.showModal = true;
    }

    closeModal() {
      this.showModal = false;
    }

    
    guardarItem() {
      this.getDescrip(this.ItemsModel.id_prod);

      let index = this.FacturasModel.items.findIndex(req => req.index === this.ItemsModel.index);
      if (index == -1) {
        this.FacturasModel.items.push(this.ItemsModel);
      } else {
        this.FacturasModel.items[index] = this.ItemsModel;
      }

      this.dataSource = [...this.FacturasModel.items];
      this.showModal = false;
    }

    getNombre(cod_cli) {

      if (!cod_cli) return cod_cli;
  
      if (typeof this.ClienteList != 'undefined') {
        let index = this.ClienteList.findIndex(req => req.cod_cli === cod_cli);
        if (index == -1) {
          this.FacturasModel.nombre = '';
        } else {
          this.FacturasModel.nombre = this.ClienteList[index].nombre;
        }
    
      }
    }

    getDescrip(id_prod) {

      if (!id_prod) return id_prod;
  
      if (typeof this.ProductoList != 'undefined') {
        let index = this.ProductoList.findIndex(req => req.id_prod === id_prod);
        if (index == -1) {
          this.ItemsModel.cod_prod = '';
          this.ItemsModel.descrip = '';
        } else {
          this.ItemsModel.cod_prod = this.ProductoList[index].cod_prod;
          this.ItemsModel.descrip = this.ProductoList[index].descrip;
        }
    
      }
    }

  }