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
        Producto GetByCod(string cod_prod, int id_empre);
        bool Delete(int id);
        bool Update(Producto producto);
        List<Producto> GetAll();
        List<Producto> GetAllByEmpre(int id_empre);
    }
}
