using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using TesteViaVArejo.Domain.Entities;

namespace TesteViaVarejo.Repository.Repository.Interfaces
{
    public interface IRepositoryBase<T> : IDisposable where T : EntityBase
    {
        IList<T> GetAll();
        T GetOne(object Id);
        void InsertOrUpdate(T source);
        void Delete(object Id);
        IQueryable<T> GetBy(Expression<Func<T, bool>> predicate);
    }
}
