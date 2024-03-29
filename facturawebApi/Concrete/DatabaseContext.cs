﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using facturawebApi.DataModel;

namespace facturawebApi.Concrete
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        public DbSet<Empresas> Empresas { get; set; }
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<CliAbon> CliAbon { get; set; }
        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<Producto> Producto { get; set; }
        public DbSet<HVenta> HVenta { get; set; }
        public DbSet<IVenta> IVenta { get; set; }
    }
}
