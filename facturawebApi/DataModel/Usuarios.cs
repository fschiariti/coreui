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
        public int Id_Usuario { get; set; }
        public string Usuario { get; set; }
        public string Email { get; set; }
        public string Nombre { get; set; }
        public string Password { get; set; }
    }

}