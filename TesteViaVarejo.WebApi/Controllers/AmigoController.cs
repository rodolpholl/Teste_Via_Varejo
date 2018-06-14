using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TesteViaVarejo.Services.Factory;
using TesteViaVarejo.WebApi.Model;
using TesteViaVArejo.Domain.Entities;

namespace TesteViaVarejo.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class AmigoController : BaseControler
    {
        
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
                catch
                {
                    return StatusCode(500);

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
                    return Ok(amigoService.GetAmigoById(id));
                }
                catch
                {
                    return StatusCode(500);

                }
            }
        }

        [HttpPost]
        public IActionResult Add(AmigoModel model)
        {
            using (var amigoService = new AmigoFactory(_serviceOptions).Build())
            {
                try
                {
                    var amigo = amigoService.AddAmigo(_mapper.Map<Amigo>(model));
                    return Ok(_mapper.Map<AmigoModel>(amigo));
                }
                catch
                {
                    return StatusCode(500);
                }
            }
        }

        [HttpPut]
        public IActionResult Update(AmigoModel model)
        {
            using (var amigoService = new AmigoFactory(_serviceOptions).Build())
            {
                try
                {
                    var amigo = amigoService.UpdateAmigo(_mapper.Map<Amigo>(model));
                    return Ok(_mapper.Map<AmigoModel>(amigo));
                }
                catch
                {
                    return StatusCode(500);
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
                catch
                {
                    return StatusCode(500);
                }
                
            }
        }
    }
}