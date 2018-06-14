using System;
using System.Collections.Generic;
using System.Text;

namespace TesteViaVarejo.Services.Factory
{
    public class UserFactory
    {
        public ServiceOptions _options { get; set; }

        public UserFactory(ServiceOptions options)
        {
            this._options = options;
        }

        public UserService Build()
        {
            return new UserService(this._options.ConnectionString);
        }

        public UserService Build(ServiceOptions options)
        {
            return new UserService(options.ConnectionString);
        }
    }
    
}
