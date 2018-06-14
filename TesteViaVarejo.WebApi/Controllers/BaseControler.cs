using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TesteViaVarejo.Services.Factory;

namespace TesteViaVarejo.WebApi.Controllers
{
    public class BaseControler : ControllerBase
    {
        protected  IMapper _mapper;
        protected  ServiceOptions _serviceOptions;
    }
}
