using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using facturawebApi.DataModel;
using facturawebApi.ViewModel;


namespace facturawebApi.Interface
{
    public interface IUsuarios
    {
        bool Insert(Usuarios usuario);
        bool CheckExists(string usuario);
        Usuarios GetById(int id_usuario);
        bool Delete(int id_usuario);
        bool Update(Usuarios id_usuario);
        List<Usuarios> GetAll();
        bool Authenticate(string usuario, string password);
        LoginResponse GetDetailsbyCredentials(string username);
    }
}