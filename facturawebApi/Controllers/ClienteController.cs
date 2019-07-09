using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using facturawebApi.DataModel;
using facturawebApi.Interface;
using Microsoft.AspNetCore.Authorization;
using facturawebApi.ViewModel;
using System.Net;
using System.Net.Http;


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

        // GET api/Cliente
        [HttpGet]
        public IEnumerable<Cliente> Get()
        {
            try
            {
                return _cliente.GetAll();
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET api/Cliente/57
        [Route("[action]/{id_empre}")]
        [HttpGet]
        public IEnumerable<Cliente> GetAllByEmpre(int id_empre)
        {
            try
            {
                return _cliente.GetAllByEmpre(id_empre);
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET: api/GetByCod/897/57
        [Route("[action]/{cod_cli}/{id_empre}")]
        [HttpGet]
        public Cliente GetByCod(string cod_cli, int id_empre)
        {
            try
            {
                return _cliente.GetByCod(cod_cli, id_empre);
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET: api/Cliente/5
        [HttpGet("{id}")]
        public Cliente Get(int id)
        {
            try
            {
                return _cliente.GetById(id);
            }
            catch (Exception)
            {

                throw;
            }
        }



        // POST: api/Cliente
        [HttpPost]
        public HttpResponseMessage Post([FromBody] ClienteViewModel clienteViewModel)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    if (_cliente.CheckExists(clienteViewModel.nombre))
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.Conflict
                        };

                        return response;
                    }
                    else
                    {
                        var temp = AutoMapper.Mapper.Map<Cliente>(clienteViewModel);

                        _cliente.Insert(temp);

                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.OK
                        };

                        return response;
                    }
                }
                else
                {
                    var response = new HttpResponseMessage()
                    {

                        StatusCode = HttpStatusCode.BadRequest
                    };

                    return response;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT: api/Cliente/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] ClienteViewModel clienteViewModel)
        {
            try
            {
                var temp = AutoMapper.Mapper.Map<Cliente>(clienteViewModel);
                _cliente.Update(temp);

                var response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };

                return response;
            }
            catch (Exception)
            {
                var response = new HttpResponseMessage()
                {

                    StatusCode = HttpStatusCode.BadRequest
                };

                return response;

            }
        }

        // DELETE: api/Cliente/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            try
            {

                var result = _cliente.Delete(id);

                if (result)
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };
                    return response;
                }
                else
                {
                    var response = new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.BadRequest
                    };
                    return response;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
