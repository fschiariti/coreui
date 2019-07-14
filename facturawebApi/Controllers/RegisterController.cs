using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using facturawebApi.DataModel;
using facturawebApi.Interface;
using facturawebApi.ViewModel;
using facturawebApi.Common;
using System.Net;
using System.Net.Http;


namespace facturawebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly IUsuarios _usuarios;
        private readonly IEmpresas _empresas;
        public RegisterController(IOptions<AppSettings> appSettings, IUsuarios usuarios, IEmpresas empresas)
        {
            _empresas = empresas;
            _usuarios = usuarios;
            _appSettings = appSettings.Value;
        }

        // POST: api/register

        [HttpPost]
        public HttpResponseMessage Post([FromBody] LoginRequestViewModel register)
        {

            register.password = EncryptionLibrary.EncryptText(register.password);

            try
            {
                if (ModelState.IsValid)
                {
                    if (_usuarios.CheckExists(register.usuario))
                    {
                        var response = new HttpResponseMessage()
                        {
                            StatusCode = HttpStatusCode.Conflict
                        };

                        return response;
                    }
                    else
                    {
                        //Doy de alta la empresa
                        register.des_empre = register.usuario;

                        var temp = AutoMapper.Mapper.Map<Empresas>(register);

                        _empresas.Insert(temp);

                        //Tomo numero de empresa generado

                        register.id_empre = temp.id_empre;
                        register.nombre = register.usuario;

                        var temp2 = AutoMapper.Mapper.Map<Usuarios>(register);

                        //Doy de alta el usuario

                        _usuarios.Insert(temp2);

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

    }
}
