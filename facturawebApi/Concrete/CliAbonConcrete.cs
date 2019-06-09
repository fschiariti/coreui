using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using facturawebApi.Interface;
using facturawebApi.ViewModel;
using facturawebApi.DataModel;

namespace facturawebApi.Concrete
{

    public class CliAbonConcrete : ICliAbon
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public CliAbonConcrete(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public bool CheckExists(string nombre)
        {
            return false;
        }

        public bool Delete(int Id)
        {
            var data = (from CliAbon in _context.CliAbon
                            where CliAbon.id_abon == Id
                            select CliAbon).FirstOrDefault();

            if (data != null)
            {
                _context.CliAbon.Remove(data);
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

        public IQueryable<CliAbonViewModel> GetAll()
        {
            IQueryable<CliAbonViewModel> result = (from cliabon in _context.CliAbon
                          join cliente in _context.Cliente on 
                          cliabon.id_cli equals cliente.id_cli
                          join producto in _context.Producto on
                          cliabon.id_prod equals producto.id_prod
                          select new CliAbonViewModel
                          {
                              id_abon = cliabon.id_abon,
                              id_cli = cliente.id_cli,
                              cod_cli = cliente.cod_cli,
                              nombre = cliente.nombre,
                              id_prod = cliabon.id_prod,
                              descrip = producto.descrip,
                              cantidad = cliabon.cantidad,
                              precio = cliabon.precio,
                              iobserv = cliabon.iobserv
                          }).AsQueryable().OrderByDescending(x => x.id_abon);

            return result;
        }

        public CliAbonViewModel GetById(int id)
        {

            var result = (from cliabon in _context.CliAbon
                      join cliente in _context.Cliente on
                      cliabon.id_cli equals cliente.id_cli
                      where cliabon.id_abon == id
                      select new CliAbonViewModel
                      {
                          id_abon = cliabon.id_abon,
                          id_cli = cliente.id_cli,
                          cod_cli = cliente.cod_cli,
                          nombre = cliente.nombre,
                          id_prod = cliabon.id_prod,
                          descrip = ""
                      }).FirstOrDefault();


            return result;

        }

        public void Insert(CliAbon CliAbon)
        {
            _context.CliAbon.Add(CliAbon);
            _context.SaveChanges();

        }

        public bool Update(CliAbon CliAbon)
        {
            _context.Entry(CliAbon).Property(x => x.id_prod).IsModified = true;
            var result = _context.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            else
            {
                return false;
            }

            throw new NotImplementedException();
        }
    }
}
