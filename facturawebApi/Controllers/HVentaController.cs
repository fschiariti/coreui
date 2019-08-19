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
        private readonly IIVenta _IVenta;


        public HVentaController(IHVenta HVenta, IIVenta IVenta)
        {
            _HVenta = HVenta;
            _IVenta = IVenta;

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

        // GET api/HVenta/57
        [Route("[action]/{id_empre}")]
        [HttpGet]
        public IEnumerable<HVentaViewModel> GetAllByEmpre(int id_empre)
        {
            try
            {
                return _HVenta.GetAllByEmpre(id_empre);
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

            Int64 id_comp;

            try
            {
                if (ModelState.IsValid)
                {
                    if (_HVenta.CheckExists(HVentaViewModel.id_comp))
                    {

                        var temp = AutoMapper.Mapper.Map<HVenta>(HVentaViewModel);

                        _HVenta.Update(temp);
                        id_comp = temp.id_comp;
                    }
                    else
                    {
                        var temp = AutoMapper.Mapper.Map<HVenta>(HVentaViewModel);

                        id_comp = _HVenta.Insert(temp);
                    }

                    foreach (IVentaViewModel item in HVentaViewModel.items)
                    {
                        item.id_comp = id_comp;
                        item.id_empre = HVentaViewModel.id_empre;
                        var iventa = AutoMapper.Mapper.Map<IVenta>(item);

                        if (_IVenta.CheckExists(item.id_item))
                        {
                            _IVenta.Update(iventa);
                        } else
                        {
                            _IVenta.Insert(iventa);
                        }

                    }

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

        // PUT: api/HVenta/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] HVentaViewModel HVentaViewModel)
        {
            Int64 id_comp;

            try
            {
                if (ModelState.IsValid)
                {
                    if (_HVenta.CheckExists(HVentaViewModel.id_comp))
                    {

                        var temp = AutoMapper.Mapper.Map<HVenta>(HVentaViewModel);

                        _HVenta.Update(temp);
                        id_comp = temp.id_comp;
                    }
                    else
                    {
                        var temp = AutoMapper.Mapper.Map<HVenta>(HVentaViewModel);

                        id_comp = _HVenta.Insert(temp);
                    }

                    foreach (IVentaViewModel item in HVentaViewModel.items)
                    {
                        item.id_comp = id_comp;
                        item.id_empre = HVentaViewModel.id_empre;
                        var iventa = AutoMapper.Mapper.Map<IVenta>(item);

                        if (_IVenta.CheckExists(item.id_item))
                        {
                            _IVenta.Update(iventa);
                        }
                        else
                        {
                            _IVenta.Insert(iventa);
                        }

                    }

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
