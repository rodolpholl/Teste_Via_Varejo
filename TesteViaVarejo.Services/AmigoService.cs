using System;
using System.Collections.Generic;
using System.Text;
using TesteViaVarejo.Repository.Repository;
using TesteViaVArejo.Domain.Entities;

namespace TesteViaVarejo.Services
{
    public class AmigoService : ServiceBase, IDisposable
    {

        private AmigoRepository _amigoRepository { get; set; }

        public AmigoService(string ConnectionString)
        {
            this.ConnectionString = ConnectionString;
            this._amigoRepository = new AmigoRepository(this.ConnectionString);
        }

        public IList<Amigo> ListarAmigos()
        {
            return _amigoRepository.GetAll();
        }
        

        public void Dispose()
        {
            if (_amigoRepository != null)
                _amigoRepository.Dispose();
            GC.Collect();
        }

        public Amigo AddAmigo(Amigo amigo)
        {
            _amigoRepository.InsertOrUpdate(amigo);
            return amigo;
        }

        public Amigo UpdateAmigo(Amigo amigo)
        {
            _amigoRepository.InsertOrUpdate(amigo);
            return amigo;
        }

        public void DeleteAmigo(Amigo amigo)
        {
            _amigoRepository.Delete(amigo.Id);
        }

        public Amigo GetAmigoById(int id)
        {
            return _amigoRepository.GetOne(id);
        }
    }
}
