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
                    var loginstatus = _usuarios.Authenticate(value.Usuario, EncryptionLibrary.EncryptText(value.Password));

                    if (loginstatus)
                    {
                        var userdetails = _usuarios.GetDetailsbyCredentials(value.Usuario);

                        if (userdetails != null)
                        {

                            var tokenHandler = new JwtSecurityTokenHandler();
                            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                            var tokenDescriptor = new SecurityTokenDescriptor
                            {
                                Subject = new ClaimsIdentity(new Claim[]
                                {
                                        new Claim(ClaimTypes.Name, userdetails.Usuario.ToString())
                                }),
                                Expires = DateTime.UtcNow.AddDays(1),
                                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                                    SecurityAlgorithms.HmacSha256Signature)
                            };
                            var token = tokenHandler.CreateToken(tokenDescriptor);
                            value.Token = tokenHandler.WriteToken(token);

                            // remove password before returning
                            value.Password = null;

                            return Ok(value);

                        }
                        else
                        {
                            value.Password = null;
                            return Ok(value);
                        }
                    }
                    value.Password = null;
                    return Ok(value);
                }
                value.Password = null;
                return Ok(value);
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
