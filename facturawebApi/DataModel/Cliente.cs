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
    [Table("Cliente")]
    public class Cliente
    {
        [Key]
        public int id_cli { get; set; }

        public string cod_cli { get; set; }
        public string nombre { get; set; }
        public string nro_doc { get; set; }
        public int? id_empre { get; set; }

    }
}
