using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TesteViaVarejo.WebApi.Model
{
    public class AmigoModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
    }
}
