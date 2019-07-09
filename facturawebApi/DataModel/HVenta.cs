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
    [Table("Hventa")]
    public class HVenta
    {
        [Key]
        public Int64 id_comp { get; set; }

        public int id_cli { get; set; }
        public DateTime? fecha { get; set; }
        public string observ { get; set; }
        public decimal imp_tot { get; set; }
        public string referencia { get; set; }
        public int? id_empre { get; set; }

    }
}
