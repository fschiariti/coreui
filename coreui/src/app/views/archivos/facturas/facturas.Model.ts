import { ItemsModel } from './items.Model';

export class FacturasModel
{
    public id_comp: number = 0 ;
    public id_cli: number = 0 ;
    public fecha: Date;
    public cod_cli: string = "";
    public nombre: string = "";
    public imp_tot: number = 0 ;
    public id_empre: number = 0 ;
    public items: ItemsModel[];

}