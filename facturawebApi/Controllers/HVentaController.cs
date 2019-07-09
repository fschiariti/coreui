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
    public class HVentaController : ControllerBase
    {
        private readonly IHVenta _HVenta;

        public HVentaController(IHVenta HVenta )
        {
            _HVenta = HVenta;
        }

        // GET api/HVenta
        [HttpGet]
        public IQueryable<HVentaViewModel> Get()
        {
            try
            {
                return _HVenta.GetAll();
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET: api/HVenta/5
        [HttpGet("{id}")]
        public HVentaViewModel Get(int id)
        {
            try
            {
                return _HVenta.GetById(id);
            }
            catch (Exception)
            {

                throw;
            }
        }

        // POST: api/HVenta
        [HttpPost]
        public HttpResponseMessage Post([FromBody] HVentaViewModel HVentaViewModel)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    if (_HVenta.CheckExists(HVentaViewModel.id_comp))
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.Conflict
                        };

                        return response;
                    }
                    else
                    {
                        var temp = AutoMapper.Mapper.Map<HVenta>(HVentaViewModel);

                        _HVenta.Insert(temp);

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

        // PUT: api/HVenta/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] HVentaViewModel HVentaViewModel)
        {
            try
            {
                var temp = AutoMapper.Mapper.Map<HVenta>(HVentaViewModel);
                _HVenta.Update(temp);

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

        // DELETE: api/HVenta/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            try
            {

                var result = _HVenta.Delete(id);

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
