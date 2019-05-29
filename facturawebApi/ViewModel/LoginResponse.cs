using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace facturawebApi.ViewModel
{ 
    public class LoginResponse
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public bool Status { get; set; }
        public int RoleId { get; set; }
    }
}
