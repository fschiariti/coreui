using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace facturawebApi.ViewModel
{
    public class ProductoViewModel
    {
        public int id_prod { get; set; }
        public string cod_prod { get; set; }
        public string descrip  {get; set;}
        public string observ { get; set; }
        public int id_empre { get; set; }

    }
}
