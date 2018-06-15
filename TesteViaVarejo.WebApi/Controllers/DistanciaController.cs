using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TesteViaVarejo.Services.Factory;

namespace TesteViaVarejo.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [EnableCors("SiteCorsPolicy")]
    [ApiController]
    [Authorize("Bearer")]
    public class DistanciaController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly ServiceOptions _serviceOptions;

        public DistanciaController(IMapper mapper, ServiceOptions serviceOptions)
        {
            this._mapper = mapper;
            this._serviceOptions = serviceOptions;
        }

        [HttpGet("GetListaAmigos/{id}")]
        public IActionResult GetListaAmigos(int id)
        {
            using (var amigoService = new AmigoFactory(_serviceOptions).Build())
            {
                try
                {
                    return Ok(amigoService.GetLsitaAmigos(id).OrderBy(x => x.Nome).ToList());
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);

                }
            }
        }

        [HttpGet("GetAmigosProximos/{id}/{qtd}")]
        public IActionResult GetAmigosProximos(int id, int qtd)
        {
            using (var amigoService = new AmigoFactory(_serviceOptions).Build())
            {
                try
                {
                    return Ok(amigoService.GetAmigosProximos(id,qtd).OrderBy(x => x.Nome).ToList());
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);

                }
            }
        }
    }
}