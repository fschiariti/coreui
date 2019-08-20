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

    public class IVentaConcrete : IIVenta
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public IVentaConcrete(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public bool CheckExists(Int64 Id)
        {
            var data = (from IVenta in _context.IVenta
                        where IVenta.id_item == Id
                        select IVenta).FirstOrDefault();

            if (data != null)
            {
                return true;
            } else
            {
                return false;
            }
        }

        public bool Delete(Int64 Id)
        {
            var data = (from IVenta in _context.IVenta
                            where IVenta.id_item == Id
                            select IVenta).FirstOrDefault();

            if (data != null)
            {
                _context.IVenta.Remove(data);
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

        public IQueryable<IVentaViewModel> GetAll()
        {
            IQueryable<IVentaViewModel> result = (from IVenta in _context.IVenta
                          join producto in _context.Producto on
                          IVenta.id_prod equals producto.id_prod
                          select new IVentaViewModel
                          {
                              id_comp = IVenta.id_comp,
                              id_prod = producto.id_prod,
                              cod_prod = producto.cod_prod,
                              descrip = producto.descrip,
                              cantidad = IVenta.cantidad,
                              precio = IVenta.precio,
                              iobserv = IVenta.iobserv
                          }).AsQueryable().OrderByDescending(x => x.id_item);

            return result;
        }

        public List<IVentaViewModel> GetItemsById(Int64 id)
        {

            var result = (from IVenta in _context.IVenta
                         join producto in _context.Producto on
                         IVenta.id_prod equals producto.id_prod
                         where IVenta.id_comp == id
                         select new IVentaViewModel
                         {
                             id_item = IVenta.id_item,
                             id_comp = IVenta.id_comp,
                             id_prod = producto.id_prod,
                             cod_prod = producto.cod_prod,
                             descrip = producto.descrip,
                             cantidad = IVenta.cantidad,
                             precio = IVenta.precio,
                             iobserv = IVenta.iobserv
                         }).ToList();


            return result;

        }



        public IVentaViewModel GetById(Int64 id)
        {

            var result = (from IVenta in _context.IVenta
                          join producto in _context.Producto on
                          IVenta.id_prod equals producto.id_prod
                          select new IVentaViewModel
                          {
                              id_comp = IVenta.id_comp,
                              id_prod = producto.id_prod,
                              cod_prod = producto.cod_prod,
                              descrip = producto.descrip,
                              cantidad = IVenta.cantidad,
                              precio = IVenta.precio,
                              iobserv = IVenta.iobserv
                          }).FirstOrDefault();


            return result;

        }

        public Int64 Insert(IVenta IVenta)
        {
            _context.IVenta.Add(IVenta);
            _context.SaveChanges();

            Int64 id = IVenta.id_item;

            return id;
        }

        public bool Update(IVenta IVenta)
        {
            _context.Entry(IVenta).Property(x => x.id_prod).IsModified = true;
            _context.Entry(IVenta).Property(x => x.precio).IsModified = true;
            _context.Entry(IVenta).Property(x => x.cantidad).IsModified = true;
            _context.Entry(IVenta).Property(x => x.iobserv).IsModified = true;

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
