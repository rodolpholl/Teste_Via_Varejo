using System;
using System.Collections.Generic;
using System.Text;
using TesteViaVArejo.Domain.Entities;

namespace TesteViaVarejo.Repository.Repository
{
    public class UserRepository : RepositoryBase<User>
    {
        public UserRepository(string ConnectionString): base(ConnectionString)
        {}
        
        
    }
}
