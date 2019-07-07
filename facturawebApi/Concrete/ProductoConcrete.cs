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

    public class ProductoConcrete : IProducto
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public ProductoConcrete(DatabaseContext context, IConfiguration configuration)
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
            var data = (from producto in _context.Producto
                            where producto.id_prod == Id
                            select producto).FirstOrDefault();

            if (data != null)
            {
                _context.Producto.Remove(data);
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

        public List<Producto> GetAll()
        {
            var result = (from producto in _context.Producto
                          select producto).ToList();

            return result;
        }

        public List<Producto> GetAllByEmpre(int id_empre)
        {
            var result = (from producto in _context.Producto
                          where producto.id_empre == id_empre
                          select producto).ToList();

            return result;
        }

        public Producto GetByCod(string cod_prod, int id_empre)
        {
            var result = (from producto in _context.Producto
                          where producto.cod_prod == cod_prod && producto.id_empre == id_empre
                          select producto).FirstOrDefault();

            return result;

        }

        public Producto GetById(int id)
        {
            var result = (from producto in _context.Producto  where producto.id_prod == id
                          select producto).FirstOrDefault();

            return result;

        }

        public void Insert(Producto Producto)
        {
            _context.Producto.Add(Producto);
            _context.SaveChanges();

//            throw new NotImplementedException();
        }

        public bool Update(Producto Producto)
        {
            _context.Entry(Producto).Property(x => x.descrip).IsModified = true;
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
