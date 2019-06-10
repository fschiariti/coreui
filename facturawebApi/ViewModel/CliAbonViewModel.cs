using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace facturawebApi.ViewModel
{
    public class CliAbonViewModel
    {
        public int id_abon { get; set; }
        public int id_cli { get; set; }
        public string cod_cli { get; set; }
        public string nombre { get; set; }
        public int id_prod { get; set; }
        public string cod_prod { get; set; }
        public string descrip { get; set; }
        public decimal cantidad { get; set; }
        public decimal precio { get; set; }
        public string iobserv { get; set; }
        public int? id_empre { get; set; }
    }
}
