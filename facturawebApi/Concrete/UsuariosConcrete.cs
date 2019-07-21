using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using facturawebApi.Interface;
using facturawebApi.DataModel;
using facturawebApi.ViewModel;

namespace facturawebApi.Concrete
{
    public class UsuariosConcrete : IUsuarios
    {

        private readonly DatabaseContext _context;
        public UsuariosConcrete(DatabaseContext context)
        {
            _context = context;
        }

        public bool CheckExists(string usuario)
        {
            var result = (from usuarios in _context.Usuarios
                          where usuarios.usuario == usuario
                          select usuarios).Count();

            return result > 0 ? true : false;
        }

        public bool Authenticate(string usuario, string password)
        {
            var result = (from usuarios in _context.Usuarios
                          where usuarios.usuario == usuario && usuarios.password == password
                          select usuarios).Count();



            return result > 0 ? true : false;


        }

        public LoginResponse GetDetailsbyCredentials(string usuario)
        {
            try
            {
                var result = (from user in _context.Usuarios
                              where user.usuario == usuario
                              select new LoginResponse
                              {
                                  usuario = user.usuario,
                                  nombre = user.nombre,
                                  id_empre = user.id_empre
                              }).SingleOrDefault();

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public bool Delete(int id_usuario)
        {
            var removeuser = (from usuario in _context.Usuarios
                              where usuario.id_usuario == id_usuario
                              select usuario).FirstOrDefault();
            if (removeuser != null)
            {
                _context.Usuarios.Remove(removeuser);
                var result = _context.SaveChanges();

                if (result > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public List<Usuarios> GetAll()
        {
            var result = (from user in _context.Usuarios
                          select user).ToList();

            return result;
        }

        public Usuarios GetById(int id_usuario)
        {
            var result = (from usuario in _context.Usuarios
                          where usuario.id_usuario == id_usuario
                          select usuario).FirstOrDefault();

            return result;
        }

        public bool Insert(Usuarios usuario)
        {
            _context.Usuarios.Add(usuario);
            var result = _context.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool Update(Usuarios user)
        {
            _context.Entry(user).Property(x => x.id_usuario).IsModified = true;
            _context.Entry(user).Property(x => x.nombre).IsModified = true;
            _context.Entry(user).Property(x => x.usuario).IsModified = true;
            _context.Entry(user).Property(x => x.password).IsModified = true;
            _context.Entry(user).Property(x => x.id_empre).IsModified = true;

            var result = _context.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
