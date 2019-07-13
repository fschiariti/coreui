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
    public class CliAbonController : ControllerBase
    {
        private readonly ICliAbon _cliabon;

        public CliAbonController(ICliAbon cliabon )
        {
            _cliabon = cliabon;
        }

        // GET api/CliAbon
        [HttpGet]
        public IQueryable<CliAbonViewModel> Get()
        {
            try
            {
                return _cliabon.GetAll();
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET: api/CliAbon/5
        [HttpGet("{id}")]
        public CliAbonViewModel Get(int id)
        {
            try
            {
                return _cliabon.GetById(id);
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET api/CliAbon/57
        [Route("[action]/{id_empre}")]
        [HttpGet]
        public IEnumerable<CliAbonViewModel> GetAllByEmpre(int id_empre)
        {
            try
            {
                return _cliabon.GetAllByEmpre(id_empre);
            }
            catch (Exception)
            {

                throw;
            }
        }


        // POST: api/CliAbon
        [HttpPost]
        public HttpResponseMessage Post([FromBody] CliAbonViewModel cliabonViewModel)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    if (_cliabon.CheckExists(cliabonViewModel.nombre))
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.Conflict
                        };

                        return response;
                    }
                    else
                    {
                        var temp = AutoMapper.Mapper.Map<CliAbon>(cliabonViewModel);

                        _cliabon.Insert(temp);

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

        // PUT: api/CliAbon/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] CliAbonViewModel cliAbonViewModel)
        {
            try
            {
                var temp = AutoMapper.Mapper.Map<CliAbon>(cliAbonViewModel);
                _cliabon.Update(temp);

                var response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };

                return response;
            }
            catch (Exception)
            {
                throw;
            }

        }

        // DELETE: api/CliAbon/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            try
            {

                var result = _cliabon.Delete(id);

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
