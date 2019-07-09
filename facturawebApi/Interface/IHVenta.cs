using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using facturawebApi.DataModel;
using facturawebApi.ViewModel;

namespace facturawebApi.Interface
{
    public interface IHVenta
    {
        Int64 Insert(HVenta hventa);
        bool CheckExists(Int64 id);
        HVentaViewModel GetById(Int64 id);
        bool Delete(Int64 id);
        bool Update(HVenta hventa);
        IQueryable<HVentaViewModel> GetAll();
    }
}
