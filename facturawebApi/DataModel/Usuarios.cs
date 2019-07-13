using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace facturawebApi.DataModel
{
    [Table("Usuarios")]
    public class Usuarios
    {
        [Key]
        public int id_usuario { get; set; }
        public string usuario { get; set; }
        public string email { get; set; }
        public string nombre { get; set; }
        public string password { get; set; }
        public int id_empre { get; set; }
    }

}