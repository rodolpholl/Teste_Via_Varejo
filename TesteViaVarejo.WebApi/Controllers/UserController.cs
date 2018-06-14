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
    public class UserController : BaseControler
    {
        public UserController(IMapper mapper, ServiceOptions serviceOptions)
        {
            this._mapper = mapper;
            this._serviceOptions = serviceOptions;
        }

        [HttpGet]
        public IActionResult GetListUsers()
        {
            using (var userService = new UserFactory(_serviceOptions).Build())
            {
                try
                {
                    return Ok(_mapper.Map<IList<UserModel>>(userService.ListarUsers()));
                }
                catch
                {
                    return StatusCode(500);

                }
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            using (var userService = new UserFactory(_serviceOptions).Build())
            {
                try
                {
                    return Ok(userService.GetUsersById(id));
                }
                catch
                {
                    return StatusCode(500);

                }
            }
        }

        [HttpPost]
        public IActionResult Add(UserModel model)
        {
            using (var userService = new UserFactory(_serviceOptions).Build())
            {
                try
                {
                    var amigo = userService.AddUser(_mapper.Map<User>(model));
                    return Ok(_mapper.Map<UserModel>(amigo));
                }
                catch
                {
                    return StatusCode(500);
                }
            }
        }

        [HttpPut]
        public IActionResult Update(User model)
        {
            using (var userService = new UserFactory(_serviceOptions).Build())
            {
                try
                {
                    var amigo = userService.UpdateUser(_mapper.Map<User>(model));
                    return Ok(_mapper.Map<UserModel>(amigo));
                }
                catch
                {
                    return StatusCode(500);
                }
            }
        }


        [HttpGet("Ativar/{id}")]
        public IActionResult AtivarUsuario(int id)
        {
            using (var userService = new UserFactory(_serviceOptions).Build())
            {
                try
                {
                    userService.ActivateUser(new User() { Id = id });
                    return Ok();
                }
                catch
                {
                    return StatusCode(500);
                }

            }
        }

        [HttpGet("Desativar/{id}")]
        public IActionResult DesativarUsuario(int id)
        {
            using (var userService = new UserFactory(_serviceOptions).Build())
            {
                try
                {
                    userService.DeactivateUser(new User() { Id = id });
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