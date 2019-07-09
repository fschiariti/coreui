using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace facturawebApi.ViewModel
{
    public class HVentaViewModel
    {
        public Int64 id_comp { get; set; }
        public int id_cli { get; set; }
        public string cod_cli { get; set; }
        public string nombre { get; set; }
        public DateTime? fecha { get; set; }
        public string observ { get; set; }
        public decimal imp_tot { get; set; }
        public string referencia { get; set; }
        public int? id_empre { get; set; }

    }
}
