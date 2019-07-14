using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace facturawebApi.ViewModel
{
    public class EmpresasViewModel
    {
        [Required]
        public int id_empre { get; set; }
        [Required]
        public string des_empre { get; set; }
    }
}
