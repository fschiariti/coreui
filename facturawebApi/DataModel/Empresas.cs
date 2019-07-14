using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace facturawebApi.DataModel
{
    [Table("Empresas")]
    public class Empresas
    {
        [Key]
        public int id_empre { get; set; }
        public string des_empre { get; set; }
    }

}