﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models;

namespace Models.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210804231310_initial5")]
    partial class initial5
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Models.Categorias", b =>
                {
                    b.Property<int>("IdCategoria")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<int?>("Orden")
                        .IsRequired();

                    b.Property<string>("UrlImagen")
                        .IsRequired();

                    b.HasKey("IdCategoria");

                    b.ToTable("Categorias");
                });

            modelBuilder.Entity("Models.CategoriasSubcategorias", b =>
                {
                    b.Property<int>("IdCategoriaSubcategoria")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IdCategoria");

                    b.Property<int>("IdSubCategoria");

                    b.HasKey("IdCategoriaSubcategoria");

                    b.HasIndex("IdCategoria");

                    b.HasIndex("IdSubCategoria");

                    b.ToTable("CategoriasSubcategorias");
                });

            modelBuilder.Entity("Models.Empresas", b =>
                {
                    b.Property<int>("IdEmpresa")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Activa");

                    b.Property<DateTime>("FechaRegistro");

                    b.Property<int>("IdUsuario");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.HasKey("IdEmpresa");

                    b.HasIndex("IdUsuario");

                    b.ToTable("Empresas");
                });

            modelBuilder.Entity("Models.ImagenesEmpresa", b =>
                {
                    b.Property<int>("IdImagenEmpresa")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("EsVideo");

                    b.Property<int>("IdSede");

                    b.Property<string>("UrlImagen")
                        .IsRequired();

                    b.HasKey("IdImagenEmpresa");

                    b.HasIndex("IdSede");

                    b.ToTable("ImagenesEmpresa");
                });

            modelBuilder.Entity("Models.ImagenesMunicipio", b =>
                {
                    b.Property<int>("IdImagenMunicipio")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("IdMunicipio");

                    b.Property<string>("UrlImagen")
                        .IsRequired();

                    b.HasKey("IdImagenMunicipio");

                    b.HasIndex("IdMunicipio");

                    b.ToTable("ImagenesMunicipio");
                });

            modelBuilder.Entity("Models.Municipios", b =>
                {
                    b.Property<int>("IdMunicipio");

                    b.Property<string>("Clima")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<string>("Descripcion")
                        .IsRequired();

                    b.Property<string>("EnDescripcion")
                        .IsRequired();

                    b.Property<string>("EnFestividades")
                        .IsRequired();

                    b.Property<string>("EnQueHacer");

                    b.Property<string>("EnTips");

                    b.Property<string>("Festividades")
                        .IsRequired();

                    b.Property<string>("Latitud")
                        .IsRequired();

                    b.Property<string>("Longitud")
                        .IsRequired();

                    b.Property<string>("Nombre")
                        .IsRequired();

                    b.Property<string>("QueHacer");

                    b.Property<string>("Tips");

                    b.Property<string>("UrlImagen")
                        .IsRequired();

                    b.HasKey("IdMunicipio");

                    b.ToTable("Municipios");
                });

            modelBuilder.Entity("Models.Roles", b =>
                {
                    b.Property<int>("IdRole")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Codigo")
                        .IsRequired()
                        .HasMaxLength(12);

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.HasKey("IdRole");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Models.Sedes", b =>
                {
                    b.Property<int>("IdSede")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Activa");

                    b.Property<string>("Anexo")
                        .IsRequired();

                    b.Property<string>("Celular")
                        .IsRequired()
                        .HasMaxLength(12);

                    b.Property<string>("Correo");

                    b.Property<string>("Descripcion")
                        .IsRequired();

                    b.Property<string>("Direccion")
                        .IsRequired();

                    b.Property<string>("EnAnexo");

                    b.Property<string>("EnDescripcion");

                    b.Property<string>("EnTips");

                    b.Property<string>("FacebookUrl");

                    b.Property<DateTime>("FechaRegistro");

                    b.Property<string>("Horarios")
                        .IsRequired();

                    b.Property<int>("IdCategoriaSubcategoria");

                    b.Property<int>("IdEmpresa");

                    b.Property<int>("IdMunicipio");

                    b.Property<int?>("IdTipoSede");

                    b.Property<string>("Imagen");

                    b.Property<string>("InstagramUrl");

                    b.Property<string>("Latitud")
                        .IsRequired();

                    b.Property<string>("Longitud")
                        .IsRequired();

                    b.Property<string>("Nombre")
                        .IsRequired();

                    b.Property<string>("NombreFacebook");

                    b.Property<string>("NombreInstagram");

                    b.Property<string>("NombreTwitter");

                    b.Property<string>("Pagina");

                    b.Property<string>("Precio");

                    b.Property<string>("Telefono")
                        .IsRequired()
                        .HasMaxLength(12);

                    b.Property<string>("Tips");

                    b.Property<string>("TwitterUrl");

                    b.HasKey("IdSede");

                    b.HasIndex("IdCategoriaSubcategoria");

                    b.HasIndex("IdEmpresa");

                    b.HasIndex("IdMunicipio");

                    b.HasIndex("IdTipoSede");

                    b.ToTable("Sedes");
                });

            modelBuilder.Entity("Models.SubCategorias", b =>
                {
                    b.Property<int>("IdSubCategoria")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("UrlImagen")
                        .IsRequired();

                    b.HasKey("IdSubCategoria");

                    b.ToTable("SubCategorias");
                });

            modelBuilder.Entity("Models.TiposSede", b =>
                {
                    b.Property<int>("IdTipoSede")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.HasKey("IdTipoSede");

                    b.ToTable("TiposSede");
                });

            modelBuilder.Entity("Models.Usuarios", b =>
                {
                    b.Property<int>("IdUsuario")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Activo");

                    b.Property<string>("Apellidos")
                        .HasMaxLength(30);

                    b.Property<string>("Celular")
                        .HasMaxLength(10);

                    b.Property<string>("Codigo")
                        .IsRequired()
                        .HasMaxLength(12);

                    b.Property<string>("Contrasena");

                    b.Property<string>("Correo")
                        .HasMaxLength(50);

                    b.Property<string>("Direccion")
                        .HasMaxLength(100);

                    b.Property<DateTime>("FechaNacimiento");

                    b.Property<DateTime>("FechaRegistro");

                    b.Property<string>("Genero")
                        .HasMaxLength(9);

                    b.Property<int>("IdRole");

                    b.Property<string>("Identificacion")
                        .IsRequired()
                        .HasMaxLength(12);

                    b.Property<string>("Nombres")
                        .HasMaxLength(30);

                    b.Property<string>("Telefono")
                        .HasMaxLength(10);

                    b.HasKey("IdUsuario");

                    b.HasIndex("IdRole");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("Models.CategoriasSubcategorias", b =>
                {
                    b.HasOne("Models.Categorias", "Categoria")
                        .WithMany()
                        .HasForeignKey("IdCategoria")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Models.SubCategorias", "SubCategoria")
                        .WithMany()
                        .HasForeignKey("IdSubCategoria")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("Models.Empresas", b =>
                {
                    b.HasOne("Models.Usuarios", "Usuario")
                        .WithMany("Empresas")
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("Models.ImagenesEmpresa", b =>
                {
                    b.HasOne("Models.Sedes", "Sede")
                        .WithMany("ImagenesEmpresa")
                        .HasForeignKey("IdSede")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("Models.ImagenesMunicipio", b =>
                {
                    b.HasOne("Models.Municipios", "Municipio")
                        .WithMany("ImagenesMunicipio")
                        .HasForeignKey("IdMunicipio")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("Models.Sedes", b =>
                {
                    b.HasOne("Models.CategoriasSubcategorias", "CategoriaSubcategoria")
                        .WithMany("Sedes")
                        .HasForeignKey("IdCategoriaSubcategoria")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Models.Empresas", "Empresa")
                        .WithMany("Sedes")
                        .HasForeignKey("IdEmpresa")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Models.Municipios", "Municipio")
                        .WithMany("Sedes")
                        .HasForeignKey("IdMunicipio")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Models.TiposSede", "TipoSede")
                        .WithMany("Sedes")
                        .HasForeignKey("IdTipoSede");
                });

            modelBuilder.Entity("Models.Usuarios", b =>
                {
                    b.HasOne("Models.Roles", "Role")
                        .WithMany("Usuarios")
                        .HasForeignKey("IdRole")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}
