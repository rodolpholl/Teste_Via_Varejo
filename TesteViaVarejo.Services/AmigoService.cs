using GeoCoordinatePortable;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
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
            Validate(amigo);
            _amigoRepository.InsertOrUpdate(amigo);
            return amigo;
        }

        public Amigo UpdateAmigo(Amigo amigo)
        {
            Validate(amigo);
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

        public IList<Amigo> GetAmigosProximos(Amigo amigo, int quantidade)
        {
            var amigoDb = _amigoRepository.GetOne(amigo.Id);

            var coord = new GeoCoordinate(double.Parse(amigoDb.Latitude, CultureInfo.InvariantCulture), double.Parse(amigoDb.Longitude, CultureInfo.InvariantCulture));

            var ListaCoordAmigos = _amigoRepository.GetBy(x => x.Id != amigoDb.Id)
                              .Select(x => new GeoCoordinate(double.Parse(x.Latitude, CultureInfo.InvariantCulture), double.Parse(x.Longitude, CultureInfo.InvariantCulture)))
                              .OrderBy(x => x.GetDistanceTo(coord))
                              .ToList()
                              .Take(quantidade)
                              .Select(x => 
                              new {
                                  Latitude = x.Latitude.ToString(CultureInfo.InvariantCulture),
                                  Longitude = x.Longitude.ToString(CultureInfo.InvariantCulture)
                              }).ToList()
                              .Select(x => _amigoRepository.GetBy(y => y.Latitude == x.Latitude && y.Longitude == x.Longitude)
                              .Select(y => y)
                              .ToList())
                              .SelectMany(x => x)
                              .ToList(); 

            

            return ListaCoordAmigos;
        }

        #region Validators

        public void Validate(Amigo amigo)
        {
            if (_amigoRepository.GetBy(x => x.Latitude == amigo.Latitude && x.Longitude == amigo.Longitude && x.Id != amigo.Id).Any())
                throw new TesteViaVarejoErrorHandler("Latitude e Longitude já cadastradas para um outro usuário!");
        }

        #endregion
    }
}
