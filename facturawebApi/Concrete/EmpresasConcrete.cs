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
    public class EmpresasConcrete : IEmpresas
    {

        private readonly DatabaseContext _context;
        public EmpresasConcrete(DatabaseContext context)
        {
            _context = context;
        }

        public bool CheckExists(string des_empre)
        {
            var result = (from Empresas in _context.Empresas
                          where Empresas.des_empre == des_empre
                          select Empresas).Count();

            return result > 0 ? true : false;
        }


        public bool Delete(int id_empre)
        {
            var res = (from empresas in _context.Empresas
                              where empresas.id_empre == id_empre
                              select empresas).FirstOrDefault();
            if (res != null)
            {
                _context.Empresas.Remove(res);
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

        public List<Empresas> GetAll()
        {
            var result = (from empresas in _context.Empresas
                          select empresas).ToList();

            return result;
        }

        public Empresas GetById(int id_empre)
        {
            var result = (from empresas in _context.Empresas
                          where empresas.id_empre == id_empre
                          select empresas).FirstOrDefault();

            return result;
        }

        public int Insert(Empresas Empresas)
        {
            _context.Empresas.Add(Empresas);
            var result = _context.SaveChanges();
            int id = Empresas.id_empre;
            return id;

        }

        public bool Update(Empresas emp)
        {
            _context.Entry(emp).Property(x => x.des_empre).IsModified = true;

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
