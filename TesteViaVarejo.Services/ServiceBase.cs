using System;
using System.Collections.Generic;
using System.Text;
using TesteViaVarejo.Services.Factory;

namespace TesteViaVarejo.Services
{
    public abstract class ServiceBase
    {
        protected string ConnectionString { get;set; }
        public ServiceOptions _options { get; set; }

    }
}
