using System;
using System.Collections.Generic;
using System.Text;

namespace TesteViaVarejo.Services
{
    public class TesteViaVarejoErrorHandler : Exception
    {
        public TesteViaVarejoErrorHandler(string message): base(message)
        {}
    }
}
