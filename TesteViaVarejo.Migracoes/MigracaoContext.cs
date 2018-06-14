using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using TesteViaVArejo.Domain.Entities;

namespace TesteViaVarejo.Migracoes
{
    public class MigracaoContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseSqlServer("Server=.;Database=TesteViaVarejo;Trusted_Connection=True;");
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<Amigo> Amigos { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
