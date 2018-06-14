using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TesteViaVarejo.Repository.Repository;
using TesteViaVarejo.Services.Factory;
using TesteViaVArejo.Domain.Entities;

namespace TesteViaVarejo.Services
{
    public class UserService : ServiceBase, IDisposable
    {
        public ServiceOptions _options { get; set; }
        private UserRepository _userRepository { get; set; }

        public UserService(string ConnectionString)
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

        public IList<User> ListarUsers()
        {
            return _userRepository.GetAll();
        }

        public User GetUsersById(int id)
        {
            return _userRepository.GetOne(id);
        }

        public User AddUser(User user)
        {
            try
            {

                ValidateUser(user);
                _userRepository.InsertOrUpdate(user);
                return user;
            }
            catch
            {
                throw;
            }
        }

        public User UpdateUser(User user)
        {
            try
            {
                ValidateUser(user);
                _userRepository.InsertOrUpdate(user);
                return user;
            }
            catch
            {
                throw;
            }
        }

        public User ActivateUser(User user)
        {
            try
            {
                var userActivate = _userRepository.GetOne(user.Id);
                userActivate.Ativo = true;
                _userRepository.InsertOrUpdate(userActivate);
                return userActivate;
            }
            catch
            {
                throw;
            }
        }

        public User DeactivateUser(User user)
        {
            var userActivate = _userRepository.GetOne(user.Id);
            userActivate.Ativo = false;
            _userRepository.InsertOrUpdate(userActivate);
            return userActivate;
        }

        #region Validation

        private void ValidateUser(User user)
        {

            //Validando se já existe login
            if (_userRepository.GetBy(x => x.Login == user.Login).Any())
                throw new TesteViaVarejoErrorHandler("Login já cadastrados.");

            if (!(_userRepository.GetBy(x => x.Login == user.Login && x.Senha == user.Senha).Any()))
                throw new TesteViaVarejoErrorHandler("Login ou Senha inválidos. Tente novamente.");


        }

        #endregion
    }
}
