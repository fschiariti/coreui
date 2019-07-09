using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace facturawebApi.ViewModel
{
    public class IVentaViewModel
    {
        public Int64 id_item { get; set; }

        public Int64 id_comp { get; set; }
        public int id_prod { get; set; }
        public string cod_prod { get; set; }
        public string descrip { get; set; }
        public decimal cantidad { get; set; }
        public decimal precio { get; set; }
        public string iobserv { get; set; }
        public int? id_empre { get; set; }

    }
}
