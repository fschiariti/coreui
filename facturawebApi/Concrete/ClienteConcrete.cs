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

        public List<Cliente> GetAllCliente()
        {
            var result = (from Cliente in _context.Cliente
                          select Cliente).ToList();

            return result;
        }
    }
}
