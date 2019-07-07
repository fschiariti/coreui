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
        Cliente GetByCod(string cod_cli, int id_empre);
        bool Delete(int id);
        bool Update(Cliente cliente);
        List<Cliente> GetAll();
        List<Cliente> GetAllByEmpre(int id_empre);
    }
}
