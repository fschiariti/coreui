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
    public class CompVtaController : ControllerBase
    {
        private readonly IHVenta _HVenta;
        private readonly IIVenta _IVenta;

        public CompVtaController(IHVenta HVenta, IIVenta IVenta)
        {
            _HVenta = HVenta;
            _IVenta = IVenta;
        }


        // POST: api/HVenta
        [HttpPost]
        public HttpResponseMessage Post([FromBody] List<CompVtaViewModel> listComp)
        {

            foreach (CompVtaViewModel comp in listComp)
            {

                var hventa = AutoMapper.Mapper.Map<HVenta>(comp);
                Int64 id_comp = _HVenta.Insert(hventa);

                foreach (IVentaViewModel item in comp.items)
                {
                    item.id_comp = id_comp;
                    var iventa = AutoMapper.Mapper.Map<IVenta>(item);
                    _IVenta.Insert(iventa);

                }
            }

            var response = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK
            };

            return response;

        }
    }
}
