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
    [Table("Iventa")]
    public class IVenta
    {
        [Key]
        public Int64 id_item { get; set; }

        public Int64 id_comp { get; set; }
        public int id_prod { get; set; }
        public string descrip { get; set; }
        public decimal cantidad { get; set; }
        public decimal precio { get; set; }
        public string iobserv { get; set; }
        public int? id_empre { get; set; }

    }
}
