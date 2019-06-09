using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using facturawebApi.DataModel;

namespace facturawebApi.Interface
{
    public interface IProducto
    {
        void Insert(Producto producto);
        bool CheckExists(string nombre);
        Producto GetById(int id);
        bool Delete(int id);
        bool Update(Producto producto);
        List<Producto> GetAll();
    }
}
