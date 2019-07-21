using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using facturawebApi.DataModel;
using facturawebApi.Interface;
using facturawebApi.ViewModel;
using facturawebApi.Common;


namespace facturawebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly IUsuarios _usuarios;
        public AuthenticateController(IOptions<AppSettings> appSettings, IUsuarios usuarios)
        {
            _usuarios = usuarios;
            _appSettings = appSettings.Value;
        }

        // POST: api/Authenticate
        [HttpPost]
        public IActionResult Post([FromBody] LoginRequestViewModel value)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var loginstatus = _usuarios.Authenticate(value.usuario, EncryptionLibrary.EncryptText(value.password));

                    if (loginstatus)
                    {
                        var userdetails = _usuarios.GetDetailsbyCredentials(value.usuario);

                        if (userdetails != null)
                        {

                            var tokenHandler = new JwtSecurityTokenHandler();
                            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                            var tokenDescriptor = new SecurityTokenDescriptor
                            {
                                Subject = new ClaimsIdentity(new Claim[]
                                {
                                        new Claim(ClaimTypes.Name, userdetails.usuario.ToString())
                                }),
                                Expires = DateTime.UtcNow.AddDays(1),
                                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                                    SecurityAlgorithms.HmacSha256Signature)
                            };
                            var token = tokenHandler.CreateToken(tokenDescriptor);
                            value.token = tokenHandler.WriteToken(token);

                            // remove password before returning
                            value.password = null;
                            //set id_empre
                            value.id_empre = userdetails.id_empre;
                            value.nombre = userdetails.nombre;

                            return Ok(value);

                        }
                        else
                        {
                            value.usuario = null;
                            value.password = null;
                            return Ok(value);
                        }
                    }
                    value.usuario = null;
                    value.password = null;
                    return Ok(value);
                }
                value.usuario = null;
                value.password = null;
                return Ok(value);
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
