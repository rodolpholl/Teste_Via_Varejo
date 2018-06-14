using System;
using System.Collections.Generic;
using System.Text;
using TesteViaVarejo.Services;

namespace TesteViaVarejo.Services.Factory.Interface
{
    public interface IServiceFactory<T> where T : ServiceBase
    {
        ServiceOptions _options { get; set; }
        T Build();
        T Build(ServiceOptions options);
    }
}
