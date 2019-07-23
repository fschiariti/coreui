import { SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit, Inject, ViewChild, Input, ElementRef,  ChangeDetectorRef} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { CliAbonModel } from './cliabon.Model';
import { CliAbonService } from './cliabon.service';
import { ProductoModel } from '../producto/producto.Model';
import { ProductoService } from '../producto/producto.service';
import { ClienteModel } from '../cliente/cliente.Model';
import { CliAbonListModel } from './cliabonList.Model';
import { ClienteService } from '../cliente/cliente.service';
import * as XLSX from 'xlsx';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Observable} from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { ModalDirective} from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName} from '@angular/forms';
import { ValidationFormsService } from './cliabon.Validation.service';



@Component({
  selector: 'cliabon',
  styleUrls: ['cliabon.css'],
  templateUrl: 'cliabon.html',
  providers: [ ValidationFormsService ]

})

export class CliAbonComponent  implements OnInit {

  public showModal: boolean;
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
  displayedColumns: string[] = ['select','nombre'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('infoModal') public infoModal: ModalDirective;
  dataSource: any;
  selection = new SelectionModel<CliAbonModel>(true, []);
  @Input() panelWidth: 5000;
  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;


  constructor(@Inject(DOCUMENT) private _document: any, CliAbonService: CliAbonService, 
  ProductoService: ProductoService, ClienteService: ClienteService,
  private changeDetectorRefs: ChangeDetectorRef, private ngxService: NgxUiLoaderService,
  private fb: FormBuilder,  public vf: ValidationFormsService) {

    this._cliabonService = CliAbonService;
    this._productoService = ProductoService;
    this._clienteService = ClienteService;
    this.CliAbonList = [];
    this.ProductoList = [];
    this.ClienteList = [];
    this.showModal = false;

    
    this.filteredClis = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(tabCliSearch => tabCliSearch ? this._filterClis(tabCliSearch) : this.ClienteList.slice()     
      )
    );
    

    this.createForm();


  }

  ngOnInit(): void {
    this.genGrid();
    this.getCliente();
    this.getProducto();
    this.onReset(); 
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


  procesar() {
    console.log(this.CliAbonList);

    let lote = new Array();


    this.CliAbonList.forEach(element => {
      let obj = new CliAbonListModel();
      obj.id_cli = element.id_cli;
      obj.fecha = new Date(); 
      obj.referencia = element.referencia;
      obj.id_empre = 57;
      let items = new Array();
      let item = {id_prod: element.id_prod, 
                  descrip: element.descrip, 
                  precio: element.precio, 
                  cantidad: element.cantidad,
                  id_empre: obj.id_empre}

      items.push(item);                  
      obj.items = items;
      lote.push(obj);
    });

    this.ngxService.start();
    this._cliabonService.AddList(lote).subscribe(
      res => {
          console.log(res);
          if (res.StatusCode == 200) {
            alert(res + 'ok');
          } else {
            alert(res + 'error');
          }
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
   this.CliAbonModel.cod_cli = "";
   this.CliAbonModel.nombre = "";
   this.CliAbonModel.id_prod = "";
   this.CliAbonModel.iobserv = "";
   this.CliAbonModel.cantidad = 0;
   this.CliAbonModel.precio = 0;
   this.showModal = true
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

    let cod_cli = this.CliAbonModel.cod_cli.trim();

    let id_prod: any;
    
    id_prod = this.f['id_prod'].value;

    this.CliAbonModel.id_prod = id_prod;


    data = this.ClienteList.filter(function (item) {
      return item.cod_cli.includes(cod_cli.trim());
    });

    if (data.length > 0) {
      this.CliAbonModel.id_cli =  data[0].id_cli;
    }
    //

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
    this.showModal = false;
  }



  refresh() {
    this.genGrid();
  }

  selectRow(row) {
    this._cliabonService.GetById(row.id_abon).subscribe(
      CliAbon => {
          this.CliAbonModel.id_abon = CliAbon.id_abon;
          this.CliAbonModel.id_cli = CliAbon.id_cli;
          this.CliAbonModel.cod_cli = CliAbon.cod_cli;
          this.CliAbonModel.nombre = CliAbon.nombre;
          this.CliAbonModel.id_prod = CliAbon.id_prod;
          this.CliAbonModel.cantidad = CliAbon.cantidad;
          this.CliAbonModel.precio = CliAbon.precio;
          this.CliAbonModel.iobserv = CliAbon.iobserv;
          console.log(this.CliAbonModel);
        },
      error => this.errorMessage = <any>error
    );

    console.log(row);
    this.showModal = true;
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
  checkboxLabel(row?: CliAbonModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id_abon + 1}`;
  }


  //Form Validation functions

  createForm() {
    this.simpleForm = this.fb.group({
      cantidad: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      id_prod: ['', [Validators.required]],
      cod_cli: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      iobserv: ['', [Validators.nullValidator]],

    });
  }

  getNombre(cod_cli) {

    //alert(cod_cli);
    if (!cod_cli) return cod_cli;

    if (typeof this.ClienteList != 'undefined') {
      let index = this.ClienteList.findIndex(state => state.cod_cli === cod_cli);
      if (index == -1) {
        this.CliAbonModel.nombre = '';
      } else {
        this.CliAbonModel.nombre = this.ClienteList[index].nombre;
      }
  
    }

  }

  // convenience getter for easy access to form fields
  get f() { return this.simpleForm.controls; }

  onReset() {

    this.submitted = false;
    this.simpleForm.reset();

  } 


}