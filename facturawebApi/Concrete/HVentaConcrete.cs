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

    public class HVentaConcrete : IHVenta
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public HVentaConcrete(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public bool CheckExists(Int64 id)
        {
            return false;
        }

        public bool Delete(Int64 Id)
        {
            var data = (from HVenta in _context.HVenta
                            where HVenta.id_comp == Id
                            select HVenta).FirstOrDefault();

            if (data != null)
            {
                _context.HVenta.Remove(data);
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

        public IQueryable<HVentaViewModel> GetAll()
        {
            IQueryable<HVentaViewModel> result = (from HVenta in _context.HVenta
                          join iventa in _context.IVenta on 
                          HVenta.id_comp equals iventa.id_comp
                          join cliente in _context.Cliente on
                          HVenta.id_cli equals cliente.id_cli
                          select new HVentaViewModel
                          {
                              id_comp = HVenta.id_comp,
                              id_cli = cliente.id_cli,
                              cod_cli = cliente.cod_cli,
                              nombre = cliente.nombre,
                              imp_tot = HVenta.imp_tot,
                              referencia = HVenta.referencia,
                              observ = HVenta.observ
                          }).AsQueryable().OrderByDescending(x => x.id_comp);

            return result;
        }

        public List<HVentaViewModel> GetAllByEmpre(int id_empre)
        {
            var result = (from HVenta in _context.HVenta
                                                  join iventa in _context.IVenta on
                                                  HVenta.id_comp equals iventa.id_comp
                                                  join cliente in _context.Cliente on
                                                  HVenta.id_cli equals cliente.id_cli
                                                  where cliente.id_empre == id_empre
                                                  select new HVentaViewModel
                                                  {
                                                      id_comp = HVenta.id_comp,
                                                      id_cli = cliente.id_cli,
                                                      cod_cli = cliente.cod_cli,
                                                      fecha = HVenta.fecha,
                                                      nombre = cliente.nombre,
                                                      imp_tot = HVenta.imp_tot,
                                                      referencia = HVenta.referencia,
                                                      observ = HVenta.observ,
                                                      id_empre = HVenta.id_empre
                                                  }).AsQueryable().OrderByDescending(x => x.id_comp).ToList();

            return result;
        }



        public HVentaViewModel GetById(Int64 id)
        {

            var result = (from HVenta in _context.HVenta
                          join iventa in _context.IVenta on
                          HVenta.id_comp equals iventa.id_comp
                          join cliente in _context.Cliente on
                          HVenta.id_cli equals cliente.id_cli
                          where HVenta.id_comp == id
                          select new HVentaViewModel
                          {
                              id_comp = HVenta.id_comp,
                              id_cli = cliente.id_cli,
                              cod_cli = cliente.cod_cli,
                              fecha = HVenta.fecha,
                              nombre = cliente.nombre,
                              imp_tot = HVenta.imp_tot,
                              referencia = HVenta.referencia,
                              observ = HVenta.observ,
                              id_empre = HVenta.id_empre
                          }).FirstOrDefault();

            var items = (from IVenta in _context.IVenta
                          join producto in _context.Producto on
                          IVenta.id_prod equals producto.id_prod
                          where IVenta.id_comp == id
                          select new IVentaViewModel
                          {
                              id_comp = IVenta.id_comp,
                              id_prod = producto.id_prod,
                              cod_prod = producto.cod_prod,
                              descrip = producto.descrip,
                              cantidad = IVenta.cantidad,
                              precio = IVenta.precio,
                              iobserv = IVenta.iobserv
                          }).ToList();


            result.items = items;

            return result;

        }

        public Int64 Insert(HVenta HVenta)
        {
            _context.HVenta.Add(HVenta);
            _context.SaveChanges();

            Int64 id = HVenta.id_comp;

            return id;
        }

        public bool Update(HVenta HVenta)
        {
            _context.Entry(HVenta).Property(x => x.id_cli).IsModified = true;
            _context.Entry(HVenta).Property(x => x.imp_tot).IsModified = true;
            _context.Entry(HVenta).Property(x => x.referencia).IsModified = true;
            _context.Entry(HVenta).Property(x => x.observ).IsModified = true;

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
