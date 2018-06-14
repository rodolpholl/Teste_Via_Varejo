using System;
using System.Collections.Generic;
using System.Text;

namespace TesteViaVarejo.Services.Factory
{
    public class LoginFactory
    {
        public ServiceOptions _options { get; set; }

        public LoginFactory(ServiceOptions options)
        {
            this._options = options;
        }

        public LoginService Build()
        {
            return new LoginService(this._options.ConnectionString);
        }

        public LoginService Build(ServiceOptions options)
        {
            return new LoginService(options.ConnectionString);
        }
    }
}
