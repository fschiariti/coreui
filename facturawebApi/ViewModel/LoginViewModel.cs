using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace facturawebApi.ViewModel
{
    public class LoginRequestViewModel
    {
        [Required(ErrorMessage = "Enter UserName")]
        public string usuario { get; set; }

        [Required(ErrorMessage = "Enter Password")]
        public string password { get; set; }
        public string email { get; set; }
        public string token { get; set; }
        public string des_empre { get; set; }
        public string nombre { get; set; }
        public int id_empre { get; set; }
        public int id_usuario { get; set; }
    }

}
