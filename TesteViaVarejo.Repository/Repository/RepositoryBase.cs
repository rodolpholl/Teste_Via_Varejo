using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using TesteViaVarejo.Repository.Context;
using TesteViaVarejo.Repository.Repository.Interfaces;
using TesteViaVArejo.Domain.Entities;

namespace TesteViaVarejo.Repository.Repository
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T: EntityBase
    {

        protected TesteViaVarejoContext _context { get; set; }

        public RepositoryBase(string ConnectionString)
        {
            this._context = new TesteViaVarejoContext(ConnectionString);
        }

        public virtual void Delete(object id)
        {

            T obj = _context.Find<T>(id);
            _context.Set<T>().Remove(obj);
            _context.SaveChanges();
        }

        public virtual void Dispose()
        {
            if (_context.Database.CurrentTransaction != null)
                _context.Database.CurrentTransaction.Rollback();
            _context.Dispose();
        }

        public virtual IList<T> GetAll()
        {
            return _context.Set<T>().ToList();
        }

        public virtual IQueryable<T> GetBy(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().Where(predicate);
        }

        public virtual T GetOne(object Id)
        {
            return _context.Set<T>().Find(Id);
        }

        public virtual void InsertOrUpdate(T source)
        {
            var entry = _context.Entry<T>(source);
            var key = entry.Metadata.FindPrimaryKey();
            if (key != null)
            {
                object[] keys = key.Properties.Select(x => x.FieldInfo.GetValue(source)).ToArray();

                T result = _context.Find<T>(keys);
                if (result == null)
                    _context.Add(source);
                else
                {
                    _context.Entry(result).State = EntityState.Detached;
                    _context.Update(source);
                }
                
                _context.SaveChanges();
            }

        }
    }
}
