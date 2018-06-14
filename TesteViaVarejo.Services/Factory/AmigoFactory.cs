using System;
using System.Collections.Generic;
using System.Text;
using TesteViaVarejo.Services.Factory.Interface;

namespace TesteViaVarejo.Services.Factory
{
    public class AmigoFactory : IServiceFactory<AmigoService>
    {
        public ServiceOptions _options { get; set; }

        public AmigoFactory(ServiceOptions options)
        {
            this._options = options;
        }


        public AmigoService Build()
        {
            return new AmigoService(this._options.ConnectionString);
        }

        public AmigoService Build(ServiceOptions options)
        {
            return new AmigoService(options.ConnectionString);
        }

    }
}
