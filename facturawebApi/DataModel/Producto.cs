using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using facturawebApi.Interface;
using facturawebApi.ViewModel;

namespace facturawebApi.DataModel
{
    [Table("Producto")]
    public class Producto
    {
        [Key]
        public int id_prod { get; set; }

        public string cod_prod { get; set; }
        public string descrip { get; set; }
        public string observ { get; set; }
        public int? id_empre { get; set; }

    }
}
