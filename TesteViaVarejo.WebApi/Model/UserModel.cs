using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TesteViaVarejo.WebApi.Model
{
    public class UserModel
    {
        public int    Id { get; set; }
        public string Nome { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public bool   Ativo { get; set; }
        
    }
}
