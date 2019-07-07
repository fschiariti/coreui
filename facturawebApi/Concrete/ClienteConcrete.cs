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

    public class ClienteConcrete : ICliente
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public ClienteConcrete(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public bool CheckExists(string nombre)
        {
            //throw new NotImplementedException();
            return false;
        }

        public bool Delete(int Id)
        {
            var data = (from cliente in _context.Cliente
                            where cliente.id_cli == Id
                            select cliente).FirstOrDefault();

            if (data != null)
            {
                _context.Cliente.Remove(data);
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

        public List<Cliente> GetAll()
        {
            var result = (from Cliente in _context.Cliente
                          select Cliente).ToList();

            return result;
        }

        public List<Cliente> GetAllByEmpre(int id_empre)
        {
            var result = (from Cliente in _context.Cliente
                          where Cliente.id_empre == id_empre
                          select Cliente).ToList();

            return result;
        }

        public Cliente GetById(int id)
        {
            var result = (from Cliente in _context.Cliente  where Cliente.id_cli == id
                          select Cliente).FirstOrDefault();

            return result;

        }

        public Cliente GetByCod(string cod_cli, int id_empre)
        {
            var result = (from Cliente in _context.Cliente
                          where Cliente.cod_cli == cod_cli && Cliente.id_empre == id_empre
                          select Cliente).FirstOrDefault();

            return result;

        }

        public void Insert(Cliente cliente)
        {
            _context.Cliente.Add(cliente);
            _context.SaveChanges();

//            throw new NotImplementedException();
        }

        public bool Update(Cliente cliente)
        {
            _context.Entry(cliente).Property(x => x.nro_doc).IsModified = true;
            _context.Entry(cliente).Property(x => x.nombre).IsModified = true;
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
