using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using WebApp.Class;
using WebApp.Helpers;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    public class SedesController : Controller
    {
        private readonly DataContext db;

        public SedesController(DataContext dataContext)
        {
            db = dataContext;
        }

        [HttpPost]
        [Route("Index")]
        public async Task<JsonResult> Index([FromBody] VistaFiltro vista)
        {
            List<VistaSede> vistaSedes;

             var  sedes = await db.Sedes.Include(s => s.Empresa).Include(i => i.CategoriaSubcategoria.SubCategoria).Include(s => s.ImagenesEmpresa).ToListAsync();

            if (vista.IdMunicipio == 0)
            {

                vistaSedes = (from cs in vista.CategoriasSubcategorias
                         join sede in sedes
                         on cs.IdCategoriaSubcategoria equals sede.IdCategoriaSubcategoria
                         where  sede.Empresa.Activa
                         select ToVistaSede(sede)).ToList();

            }
            else
            {
                vistaSedes = (from cs in vista.CategoriasSubcategorias
                         join sede in sedes
                         on cs.IdCategoriaSubcategoria equals sede.IdCategoriaSubcategoria
                         where sede.IdMunicipio == vista.IdMunicipio && sede.Empresa.Activa
                         select ToVistaSede(sede)).ToList();
            }


            return Json(new Response { IsSuccess = true, Message = "", Result = vistaSedes });
        }

        [HttpGet]
        [Route("GetSede/{IdSede}")]
        public async Task<JsonResult> GetSede([FromRoute] int IdSede)
        {
            VistaSede vista = null;
            if (IdSede != 0)
            {
               var sede = db.Sedes.Include(s => s.ImagenesEmpresa).Include(s => s.TipoSede).First(m => m.IdSede == IdSede);
               var subcat = db.CategoriasSubcategorias.Include(s => s.SubCategoria).FirstOrDefault(i => i.IdCategoriaSubcategoria == sede.IdCategoriaSubcategoria);
               var municipio = db.Municipios.FirstOrDefault(i => i.IdMunicipio == sede.IdMunicipio);
         
              
                vista = ToVistaSede(sede);
                vista.ImagenesEmpresa = vista.ImagenesEmpresa.OrderBy(i => i.Orden).ToList();
                vista.SubCategoria = subcat.SubCategoria;
                vista.Municipio = municipio;
            }

            return Json(new Response { IsSuccess = true, Message = "", Result = vista });
        }


        [HttpGet]
        [Route("Crear")]
        public  JsonResult CrearIndex()
        {
            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {

                    var municipios = db.Municipios.ToList();
                    var tiposSede = db.TiposSede.ToList();

                    return Json(new Response { IsSuccess = true, Message = string.Empty, Result = new VistaSedes { Municipios = municipios,TiposSede= tiposSede } });

                }
                catch (Exception ex)
                {
                    transacction.Rollback();
                    return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null });
                }

            }

        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("Crear")]
        public async Task<JsonResult> Crear()
        {

            var files = HttpContext.Request.Form.Files;

            var postedFile = Request.Form.Files[0];

            var ruta = Path.Combine(Directory.GetCurrentDirectory(), "images/sedes");
            var form = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
            var n = form["Nombre"];

            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    string FileName = Guid.NewGuid().ToString() + ".png";
                    var imagenGuardada = await FilesHelper.UploadPhotoAsync(ruta, files, FileName);
                    if (imagenGuardada)
                    {
                        var sede = new Sedes
                        {
                            Nombre = form["Nombre"],
                            Imagen = "sedes/" + FileName,
                            Activa = true,
                            IdMunicipio = int.Parse(form["IdMunicipio"]),
                            IdEmpresa = int.Parse(form["IdEmpresa"]),
                            IdCategoriaSubcategoria = int.Parse(form["IdCategoriaSubcategoria"]),
                            Celular = form["Celular"],
                            Descripcion = form["Descripcion"],
                            FechaRegistro = DateTime.Now,
                            Horarios= form["Horarios"],
                            Latitud = form["Latitud"],
                            Longitud = form["Longitud"],
                            Direccion = form["Direccion"],
                            IdTipoSede = int.Parse( form["IdTipoSede"]),
                            Telefono = form["Telefono"],
                            Anexo = form["Anexo"],
                            Precio = form["Precio"],
                            InstagramUrl = form["InstagramUrl"],
                            NombreInstagram = form["NombreInstagram"],
                            FacebookUrl = form["FacebookUrl"],
                            NombreFacebook = form["NombreFacebook"],
                            Correo = form["Correo"],
                            Tips = form["Tips"],
                            NombreTwitter = form["NombreTwitter"],
                            TwitterUrl = form["TwitterUrl"],
                            Pagina = form["Pagina"],
                            EnDescripcion = form["EnDescripcion"],
                            EnTips = form["EnTips"],
                            EnAnexo = form["EnAnexo"]

                    };

                       
                        db.Sedes.Add(sede);
                        await db.SaveChangesAsync();
                        InsertarImagenes(form, sede.IdSede);
                        await db.SaveChangesAsync();



                        transacction.Commit();
                    }
                    else
                    {

                        return Json(new Response { IsSuccess = false, Message = "No se logro guardar la imagen ", Result = null });
                    }


                    return Json(new Response { IsSuccess = true, Message = "Sede creada correctamente", Result = null });

                }
                catch (Exception ex)
                {
                    transacction.Rollback();
                    return Json(new Response { IsSuccess = false, Message = ex.Message, Result = null });
                }

            }

        }

        [HttpGet]
        [Route("Editar/{id}")]
        public async Task<JsonResult> Editar([FromRoute] int id)
        {
            try
            {

                var sede = await db.Sedes.Include(s => s.ImagenesEmpresa).Include(s => s.CategoriaSubcategoria.SubCategoria).Include(s => s.CategoriaSubcategoria.Categoria).Where(e => e.IdSede == id).FirstOrDefaultAsync();
                var municipios = db.Municipios.ToList();
                var tiposSede = db.TiposSede.ToList();
                var cat = db.Categorias.ToList();
                var catSub = db.CategoriasSubcategorias.Include(s => s.SubCategoria).Where(ct => ct.IdCategoria== sede.CategoriaSubcategoria.IdCategoria).ToList();
              

                var vistaSede = ToVistaSede(sede);
                vistaSede.Municipios = municipios;
              
                vistaSede.TiposSede = tiposSede;
                vistaSede.IdCategoria = sede.CategoriaSubcategoria.IdCategoria;
                vistaSede.Categorias = cat;
                vistaSede.CategoriasSubcategorias= (from cs in catSub select ToVistaCategoriasSubcategorias(cs)).ToList();



                for (int i = 0; i < sede.ImagenesEmpresa.Count; i++)
                {
                    var e = sede.ImagenesEmpresa.ElementAt(i);

                    vistaSede.SetObjectProperty("URLImagen" + e.Orden, e.UrlImagen, vistaSede);

                    vistaSede.SetObjectProperty("EsVideo" + e.Orden, e.EsVideo.ToString(), vistaSede);

                    vistaSede.SetObjectProperty("EsPrincipal" + e.Orden, e.EsPrincipal.ToString(), vistaSede);

                }

                return Json(new Response { IsSuccess = true, Message = string.Empty, Result = vistaSede });
            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null });
            }
        }


        [HttpPost, DisableRequestSizeLimit]
        [Route("Editar")]
        public async Task<JsonResult> Editar()
        {

            var files = HttpContext.Request.Form.Files;
            var ruta = Path.Combine(Directory.GetCurrentDirectory(), "images/sedes");
            var form = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());

            var Id = int.Parse(form["IdSede"]);
            var UrlImagen = form["Imagen"];
            bool archivoBorrado = false;
            var sede = await db.Sedes.Include(s => s.ImagenesEmpresa).Where(u => u.IdSede == Id).FirstOrDefaultAsync();

            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    string FileName = Guid.NewGuid().ToString() + ".png";
                    if (files.Count() > 0)
                    {
                        archivoBorrado = FilesHelper.DeleteFile(ruta, UrlImagen.Substring(UrlImagen.IndexOf("/") + 1));
                        if (archivoBorrado)
                        {
                            var imagenGuardada = await FilesHelper.UploadPhotoAsync(ruta, files, FileName);
                            if (imagenGuardada)
                            {
                                sede.Imagen = "sedes/" + FileName;
                            }
                            else
                            {
                                sede.Imagen = "sedes/default.png";
                            }
                        }
                    }

                    sede.Nombre = form["Nombre"];
                    sede.Activa = Boolean.Parse(form["Activa"]);
                    sede.IdMunicipio = int.Parse(form["IdMunicipio"]);
                    sede.IdEmpresa = int.Parse(form["IdEmpresa"]);
                    sede.IdCategoriaSubcategoria = int.Parse(form["IdCategoriaSubcategoria"]);
                    sede.Celular = form["Celular"];
                    sede.Descripcion = form["Descripcion"];
                    sede.Direccion = form["Direccion"];
                    sede.Horarios = form["Horarios"];
                    sede.Latitud = form["Latitud"];
                    sede.Longitud = form["Longitud"];
                    sede.IdTipoSede = int.Parse(form["IdTipoSede"]);
                    sede.Telefono = form["Telefono"];
                    sede.Anexo = form["Anexo"];
                    sede.Precio = form["Precio"];
                    sede.InstagramUrl = form["InstagramUrl"];
                    sede.NombreInstagram = form["NombreInstagram"];
                    sede.FacebookUrl = form["FacebookUrl"];
                    sede.NombreFacebook = form["NombreFacebook"];
                    sede.Correo = form["Correo"];
                    sede.Tips = form["Tips"];
                    sede.NombreTwitter = form["NombreTwitter"];
                    sede.TwitterUrl = form["TwitterUrl"];
                    sede.Pagina = form["Pagina"];
                    sede.EnDescripcion = form["EnDescripcion"];
                    sede.EnTips = form["EnTips"];
                    sede.EnAnexo = form["EnAnexo"];
                    db.Entry(sede).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                    db.ImagenesEmpresa.RemoveRange(sede.ImagenesEmpresa);
                    InsertarImagenes(form, sede.IdSede);
                    await db.SaveChangesAsync();
                    transacction.Commit();
                    return Json(new Response { IsSuccess = true, Message = "Sede actualizada correctamente", Result = sede });

                }
                catch (Exception ex)
                {
                    transacction.Rollback();
                    return Json(new Response { IsSuccess = false, Message = ex.Message, Result = null });
                }
            }

        }

      

        private void InsertarImagenes(Dictionary<string, string> form, int IdSede)
        {
            if (form["URLImagen1"] != "" && form["URLImagen1"] != "null")
            {
                db.ImagenesEmpresa.Add(new ImagenesEmpresa { IdSede = IdSede, UrlImagen = form["URLImagen1"], EsVideo = false, EsPrincipal = true, Orden = 1 });
            }

            if (form["URLImagen2"] != "" && form["URLImagen2"] != "null")
            {
                db.ImagenesEmpresa.Add(new ImagenesEmpresa { IdSede = IdSede, UrlImagen = form["URLImagen2"], EsVideo = false,EsPrincipal = true, Orden = 2 });
            }

            if (form["URLImagen3"] != "" && form["URLImagen3"] != "null")
            {
                db.ImagenesEmpresa.Add(new ImagenesEmpresa { IdSede = IdSede, UrlImagen = form["URLImagen3"], EsVideo = false, EsPrincipal = true, Orden = 3 });
            }
            if (form["URLImagen4"] != "" && form["URLImagen4"] != "null")
            {
                db.ImagenesEmpresa.Add(new ImagenesEmpresa { IdSede = IdSede, UrlImagen = form["URLImagen4"], EsVideo = false, EsPrincipal = true, Orden = 4 });
            }

            if (form["URLImagen5"] != "" && form["URLImagen5"] != "null")
            {
                db.ImagenesEmpresa.Add(new ImagenesEmpresa { IdSede = IdSede, UrlImagen = form["URLImagen5"], EsVideo = false, EsPrincipal = true, Orden = 5 });
            }

            if (form["URLImagen6"] != "" && form["URLImagen6"] != "null")
            {
                db.ImagenesEmpresa.Add(new ImagenesEmpresa { IdSede = IdSede, UrlImagen = form["URLImagen6"], EsVideo = bool.Parse(form["EsVideo6"]), EsPrincipal = false, Orden = 6 });
            }

            if (form["URLImagen7"] != "" && form["URLImagen7"] != "null")
            {
                db.ImagenesEmpresa.Add(new ImagenesEmpresa { IdSede = IdSede, UrlImagen = form["URLImagen7"], EsVideo = bool.Parse(form["EsVideo7"]), EsPrincipal = false, Orden = 7 });
            }

            if (form["URLImagen8"] != "" && form["URLImagen8"] != "null")
            {
                db.ImagenesEmpresa.Add(new ImagenesEmpresa { IdSede = IdSede, UrlImagen = form["URLImagen8"], EsVideo = bool.Parse(form["EsVideo8"]), EsPrincipal = false, Orden = 8 });
            }
            if (form["URLImagen9"] != "" && form["URLImagen9"] != "null")
            {
                db.ImagenesEmpresa.Add(new ImagenesEmpresa { IdSede = IdSede, UrlImagen = form["URLImagen9"], EsVideo = bool.Parse(form["EsVideo9"]), EsPrincipal = false, Orden = 9 });
            }
            if (form["URLImagen10"] != "" && form["URLImagen10"] != "null")
            {
                db.ImagenesEmpresa.Add(new ImagenesEmpresa { IdSede = IdSede, UrlImagen = form["URLImagen10"], EsVideo = bool.Parse(form["EsVideo10"]), EsPrincipal = false, Orden = 10 });
            }
            if (form["URLImagen11"] != "" && form["URLImagen11"] != "null")
            {
                db.ImagenesEmpresa.Add(new ImagenesEmpresa { IdSede = IdSede, UrlImagen = form["URLImagen11"], EsVideo = bool.Parse(form["EsVideo11"]), EsPrincipal = false, Orden = 11 });
            }
            if (form["URLImagen12"] != "" && form["URLImagen12"] != "null")
            {
                db.ImagenesEmpresa.Add(new ImagenesEmpresa { IdSede = IdSede, UrlImagen = form["URLImagen12"], EsVideo = bool.Parse(form["EsVideo12"]), EsPrincipal = false, Orden = 12 });
            }
            if (form["URLImagen13"] != "" && form["URLImagen13"] != "null")
            {
                db.ImagenesEmpresa.Add(new ImagenesEmpresa { IdSede = IdSede, UrlImagen = form["URLImagen13"], EsVideo = bool.Parse(form["EsVideo13"]), EsPrincipal = false, Orden = 13 });
            }
            if (form["URLImagen14"] != "" && form["URLImagen14"] != "null")
            {
                db.ImagenesEmpresa.Add(new ImagenesEmpresa { IdSede = IdSede, UrlImagen = form["URLImagen14"], EsVideo = bool.Parse(form["EsVideo14"]), EsPrincipal = false, Orden = 14 });
            }

        }

        private VistaSede ToVistaSede(Sedes sede)
        {
            return new VistaSede
            {
                 Horarios= sede.Horarios,
                 FechaRegistro = sede.FechaRegistro,
                 Celular= sede.Celular,
                 CategoriaSubcategoria = sede.CategoriaSubcategoria,
                 Activa = sede.Activa,
                 IdCategoriaSubcategoria = sede.IdCategoriaSubcategoria,
                 IdEmpresa = sede.IdEmpresa,
                 IdMunicipio = sede.IdMunicipio,
                 IdSede = sede.IdSede,
                 IdTipoSede = sede.IdTipoSede,
                 Imagen = sede.Imagen,
                 key = sede.IdSede,
                 Telefono = sede.Telefono,
                 TipoSede = sede.TipoSede,
                 ImagenesEmpresa = sede.ImagenesEmpresa,
                 Latitud = sede.Latitud,
                 Longitud = sede.Longitud,
                 Nombre = sede.Nombre,
                 Municipio = sede.Municipio,
                 Descripcion= sede.Descripcion,
                 Direccion= sede.Direccion,
                 Anexo = sede.Anexo,
                 FacebookUrl = sede.FacebookUrl,
                  InstagramUrl = sede.InstagramUrl,
                 Precio = sede.Precio,
                 Tips = sede.Tips,
                 NombreFacebook = sede.NombreFacebook,
                 NombreInstagram = sede.NombreInstagram,
                 TwitterUrl = sede.TwitterUrl,
                 NombreTwitter = sede.NombreTwitter,
                 Correo = sede.Correo,
                 Pagina = sede.Pagina,
                 EnAnexo = sede.EnAnexo,
                 EnDescripcion = sede.EnDescripcion,
                 EnTips = sede.EnTips

            };
        }


        private VistaCategoSubcatego ToVistaCategoriasSubcategorias(CategoriasSubcategorias catSub)
        {
            return new VistaCategoSubcatego
            {
                IdCategoria = catSub.IdCategoria,
                IdCategoriaSubcategoria = catSub.IdCategoriaSubcategoria,
                IdSubCategoria = catSub.IdSubCategoria,
                NombreSubcategoria = catSub.SubCategoria.Nombre,
                SubCategoria = catSub.SubCategoria

            };
        }

    }
}
