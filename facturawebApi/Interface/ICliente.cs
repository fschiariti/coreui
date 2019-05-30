using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using facturawebApi.DataModel;

namespace facturawebApi.Interface
{
    public interface ICliente
    {
        void Insert(Cliente cliente);
        bool CheckExists(string nombre);
        Cliente GetById(int id);
        bool Delete(int id);
        bool Update(Cliente cliente);
        List<Cliente> GetAll();
    }
}
