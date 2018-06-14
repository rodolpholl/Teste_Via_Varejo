using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

using TesteViaVArejo.Domain.Entities;

namespace TesteViaVarejo.Repository.Context
{
    public class TesteViaVarejoContext : DbContext
    {
      
        public TesteViaVarejoContext(string dbConnection)
        {
            this._StrConnection = dbConnection;
        }


        protected string _StrConnection { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_StrConnection);
            base.OnConfiguring(optionsBuilder);
        }


    }
}
