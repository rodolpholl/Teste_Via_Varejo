using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TesteViaVarejo.Services.Factory;
using TesteViaVarejo.WebApi.Auth;
using TesteViaVarejo.WebApi.Model;
using TesteViaVArejo.Domain.Entities;

namespace TesteViaVarejo.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("SiteCorsPolicy")]
    public class LoginController : ControllerBase
    {


        private readonly IMapper _mapper;
        private readonly ServiceOptions _serviceOptions;

        public LoginController(IMapper mapper, ServiceOptions serviceOptions)
        {
            this._mapper = mapper;
            this._serviceOptions = serviceOptions;
        }


        [HttpPost]
        [AllowAnonymous]
        public object Login([FromBody]LoginAuthModel model,
                            [FromServices]SigningConfigurations signingConfigurations, //Vem da configuração Startup
                            [FromServices]TokenConfigurations tokenConfigurations //Vem da configuração Startup
            )
        {
            var user = _mapper.Map<User>(model);


            try
            {
                using (var loginService = new LoginFactory(_serviceOptions).Build())
                {
                    loginService.EfetuarLogin(user);

                    var identity = new ClaimsIdentity(new GenericIdentity(user.Login, "Login"), new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                        new Claim(JwtRegisteredClaimNames.UniqueName, user.Login)
                    });

                    DateTime dataCriacao = DateTime.Now;
                    DateTime dataExpiracao = dataCriacao +
                        TimeSpan.FromSeconds(tokenConfigurations.Seconds);

                    var handler = new JwtSecurityTokenHandler();
                    var securityToken = handler.CreateToken(new SecurityTokenDescriptor
                    {
                        Issuer = tokenConfigurations.Issuer,
                        Audience = tokenConfigurations.Audience,
                        SigningCredentials = signingConfigurations.SigningCredentials,
                        Subject = identity,
                        NotBefore = dataCriacao,
                        Expires = dataExpiracao
                    });
                    var token = handler.WriteToken(securityToken);



                    return new
                    {
                        authenticated = true,
                        created = dataCriacao.ToString("yyyy-MM-dd HH:mm:ss"),
                        expiration = dataExpiracao.ToString("yyyy-MM-dd HH:mm:ss"),
                        accessToken = token,
                        message = "OK"
                    };
                }
            }
            catch (Exception ex)
            {
                return new
                {
                    authenticated = false,
                    message = $"Falha ao autenticar:\n{ex.Message}"
                };
            }


        }

    }
}