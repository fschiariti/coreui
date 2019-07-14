using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using facturawebApi.DataModel;
using facturawebApi.ViewModel;


namespace facturawebApi.Interface
{
    public interface IEmpresas
    {
        int Insert(Empresas empresas);
        bool CheckExists(string des_empre);
        Empresas GetById(int id_empre);
        bool Delete(int id_empre);
        bool Update(Empresas id_empre);
        List<Empresas> GetAll();
    }
}