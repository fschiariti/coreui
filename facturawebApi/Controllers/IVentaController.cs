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
    public class IVentaController : ControllerBase
    {
        private readonly IIVenta _IVenta;

        public IVentaController(IIVenta IVenta )
        {
            _IVenta = IVenta;
        }

        // GET api/IVenta
        [HttpGet]
        public IQueryable<IVentaViewModel> Get()
        {
            try
            {
                return _IVenta.GetAll();
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET: api/IVenta/5
        [HttpGet("{id}")]
        public IVentaViewModel Get(int id)
        {
            try
            {
                return _IVenta.GetById(id);
            }
            catch (Exception)
            {

                throw;
            }
        }


        // GET: api/IVenta/GetItemsById
        [Route("[action]/{id_comp}")]
        [HttpGet]

        public IEnumerable<IVentaViewModel> GetItemsById(Int64 id)
        {
            try
            {
                return _IVenta.GetItemsById(id);
            }
            catch (Exception)
            {

                throw;
            }
        }


        // POST: api/IVenta
        [HttpPost]
        public HttpResponseMessage Post([FromBody] IVentaViewModel IVentaViewModel)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    if (_IVenta.CheckExists(IVentaViewModel.id_comp))
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.Conflict
                        };

                        return response;
                    }
                    else
                    {
                        var temp = AutoMapper.Mapper.Map<IVenta>(IVentaViewModel);

                        _IVenta.Insert(temp);

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

        // PUT: api/IVenta/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] IVentaViewModel IVentaViewModel)
        {
            try
            {
                var temp = AutoMapper.Mapper.Map<IVenta>(IVentaViewModel);
                _IVenta.Update(temp);

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

        // DELETE: api/IVenta/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            try
            {

                var result = _IVenta.Delete(id);

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
