using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TesteViaVarejo.Services.Factory;
using TesteViaVarejo.WebApi.Model;
using TesteViaVArejo.Domain.Entities;

namespace TesteViaVarejo.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [EnableCors("SiteCorsPolicy")]
    [ApiController]
    [Authorize("Bearer")]
    public class AmigoController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ServiceOptions _serviceOptions;

        public AmigoController(IMapper mapper, ServiceOptions serviceOptions)
        {
            this._mapper = mapper;
            this._serviceOptions = serviceOptions;
        }


        [HttpGet]
        public IActionResult GetListAmigos()
        {
            using (var amigoService = new AmigoFactory(_serviceOptions).Build())
            {
                try
                {
                    return Ok(_mapper.Map<IList<AmigoModel>>(amigoService.ListarAmigos()));
                   
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);

                }
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetAmigo(int id)
        {
            using (var amigoService = new AmigoFactory(_serviceOptions).Build())
            {
                try
                {
                    return Ok(_mapper.Map<AmigoModel>(amigoService.GetAmigoById(id)));
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);

                }
            }
        }

        [HttpPost]
        public IActionResult Add([FromBody]AmigoModel model)
        {
            using (var amigoService = new AmigoFactory(_serviceOptions).Build())
            {
                try
                {
                    var amigo = amigoService.AddAmigo(_mapper.Map<Amigo>(model));
                    return Ok(_mapper.Map<AmigoModel>(amigo));
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);
                }
            }
        }

        [HttpPut]
        public IActionResult Update([FromBody]AmigoModel model)
        {
            using (var amigoService = new AmigoFactory(_serviceOptions).Build())
            {
                try
                {
                    var amigo = amigoService.UpdateAmigo(_mapper.Map<Amigo>(model));
                    return Ok(_mapper.Map<AmigoModel>(amigo));
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);
                }
            }
        }
        

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            using (var amigoService = new AmigoFactory(_serviceOptions).Build())
            {
                try
                {
                    amigoService.DeleteAmigo(new Amigo() { Id = id });
                    return Ok();
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);
                }
                
            }
        }


        
    }
}