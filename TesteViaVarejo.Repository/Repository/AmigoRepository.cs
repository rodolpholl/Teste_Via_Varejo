using System;
using System.Collections.Generic;
using System.Text;
using TesteViaVArejo.Domain.Entities;

namespace TesteViaVarejo.Repository.Repository
{
    public class AmigoRepository : RepositoryBase<Amigo>
    {
        public AmigoRepository(string ConnectionString) : base(ConnectionString)
        {}
    }
}
