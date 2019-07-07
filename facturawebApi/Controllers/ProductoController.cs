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
    public class ProductoController : ControllerBase
    {
        private readonly IProducto _producto;

        public ProductoController(IProducto producto)
        {
            _producto = producto;
        }

        // GET api/Producto
        [HttpGet]
        public IEnumerable<Producto> Get()
        {
            try
            {
                return _producto.GetAll();
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET: api/Producto/5
        [HttpGet("{id}")]
        public Producto Get(int id)
        {
            try
            {
                return _producto.GetById(id);
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET: api/GetByCod/5/57
        [Route("[action]/{cod_prod}/{id_empre}")]
        [HttpGet]
        public Producto GetByCod(string cod_prod, int id_empre)
        {
            try
            {
                return _producto.GetByCod(cod_prod, id_empre);
            }
            catch (Exception)
            {

                throw;
            }
        }


        // GET: api/GetAllByEmpre/57
        [Route("[action]/{id_empre}")]
        [HttpGet]
        public IEnumerable<Producto> GetAllByEmpre(int id_empre)
        {
            try
            {
                return _producto.GetAllByEmpre(id_empre);
            }
            catch (Exception)
            {

                throw;
            }
        }


        // POST: api/Producto
        [HttpPost]
        public HttpResponseMessage Post([FromBody] ProductoViewModel productoViewModel)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    if (_producto.CheckExists(productoViewModel.descrip))
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.Conflict
                        };

                        return response;
                    }
                    else
                    {
                        var temp = AutoMapper.Mapper.Map<Producto>(productoViewModel);

                        _producto.Insert(temp);

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

        // PUT: api/Producto/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] ProductoViewModel productoViewModel)
        {
//            try
            {
                var temp = AutoMapper.Mapper.Map<Producto>(productoViewModel);
                _producto.Update(temp);

                var response = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };

                return response;
            }
/*            catch (Exception)
            {
                var response = new HttpResponseMessage()
                {

                    StatusCode = HttpStatusCode.BadRequest
                };

                return response;

            }*/
        }

        // DELETE: api/Cliente/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            try
            {

                var result = _producto.Delete(id);

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
