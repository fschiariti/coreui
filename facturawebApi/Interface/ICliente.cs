using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using facturawebApi.DataModel;

namespace facturawebApi.Interface
{
    public interface ICliente
    {
        List<Cliente> GetAllCliente();
    }
}
