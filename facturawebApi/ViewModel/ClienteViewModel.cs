using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace facturawebApi.ViewModel
{
    public class ClienteViewModel
    {
        public int id_cli { get; set; }
        public string cod_cli { get; set; }
        public string nombre  {get; set;}
        public string nro_doc { get; set; }
        public int id_empre { get; set; }

    }
}
