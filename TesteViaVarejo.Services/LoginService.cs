using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TesteViaVarejo.Repository.Repository;
using TesteViaVArejo.Domain.Entities;

namespace TesteViaVarejo.Services
{
    public class LoginService : ServiceBase, IDisposable
    {

        private const string _mensagemErroLogin = "Login ou senha inválidos! Verifique as informações e tente novamente";

        private UserRepository _userRepository { get; set; }

        public LoginService(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
            this._userRepository = new UserRepository(this.ConnectionString);
        }

        public void Dispose()
        {
            if (_userRepository != null)
                _userRepository.Dispose();
            GC.Collect();
        }

        public void EfetuarLogin(User user)
        {

            var userDb = _userRepository.GetBy(x => x.Login == user.Login).FirstOrDefault();

            if (userDb == null)
                throw new TesteViaVarejoErrorHandler(_mensagemErroLogin);

            if (userDb.Senha != user.Senha)
                throw new TesteViaVarejoErrorHandler(_mensagemErroLogin);
        }


        

    }
}
