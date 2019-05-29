using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using facturawebApi.DataModel;
using facturawebApi.Interface;
using Microsoft.AspNetCore.Authorization;


namespace facturawebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly ICliente _cliente;

        public ClienteController(ICliente cliente)
        {
            _cliente = cliente;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<Cliente> Get()
        {
            try
            {
                return _cliente.GetAllCliente();
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
