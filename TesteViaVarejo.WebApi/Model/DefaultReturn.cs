using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TesteViaVarejo.WebApi.Model
{
    public class DefaultReturn : ActionResult
    {
        public object ResultData { get; set; }
    }
}
