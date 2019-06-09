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
    [Table("CliAbon")]
    public class CliAbon
    {
        [Key]
        public int id_abon { get; set; }
        public int id_cli { get; set; }
        public int id_prod { get; set; }
        public decimal cantidad { get; set; }
        public decimal precio { get; set; }
        public string iobserv { get; set; }
        public int? id_empre { get; set; }

    }
}
