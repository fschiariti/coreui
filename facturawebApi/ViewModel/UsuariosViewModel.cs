using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace facturawebApi.ViewModel
{
    public class UsuariosViewModel
    {
        public int id_usuario { get; set; }
        [Required]
        public string usuario { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string nombre { get; set; }
        [Required]
        public int id_empre { get; set; }
    }
}
