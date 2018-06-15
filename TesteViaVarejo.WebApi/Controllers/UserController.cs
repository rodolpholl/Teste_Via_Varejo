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
    
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ServiceOptions _serviceOptions;

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
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);

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

                    return Ok(_mapper.Map<UserModel>(userService.GetUsersById(id)));
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);

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
                    var user = userService.AddUser(_mapper.Map<User>(model));
                    return Ok(_mapper.Map<UserModel>(user));
                }
                catch (Exception ex)
                {
                    return StatusCode(500,ex.Message);
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
                    var user = userService.UpdateUser(_mapper.Map<User>(model));
                    return Ok(_mapper.Map<UserModel>(user));
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);
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
                    return Ok(_mapper.Map<UserModel>(userService.GetUsersById(id)));
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);
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
                    return Ok(_mapper.Map<UserModel>(userService.GetUsersById(id)));
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);
                }

            }
        }
    }
}