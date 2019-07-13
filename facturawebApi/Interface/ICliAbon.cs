using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using facturawebApi.DataModel;
using facturawebApi.ViewModel;

namespace facturawebApi.Interface
{
    public interface ICliAbon
    {
        void Insert(CliAbon cliabon);
        bool CheckExists(string nombre);
        CliAbonViewModel GetById(int id);
        bool Delete(int id);
        bool Update(CliAbon cliabon);
        IQueryable<CliAbonViewModel> GetAll();
        List<CliAbonViewModel> GetAllByEmpre(int id_empre);

    }
}
