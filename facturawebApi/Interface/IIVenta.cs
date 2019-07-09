using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using facturawebApi.DataModel;
using facturawebApi.ViewModel;

namespace facturawebApi.Interface
{
    public interface IIVenta
    {
        Int64 Insert(IVenta iventa);
        bool CheckExists(Int64 id);
        IVentaViewModel GetById(Int64 id);
        bool Delete(Int64 id);
        bool Update(IVenta iventa);
        IQueryable<IVentaViewModel> GetAll();
    }
}
