﻿using System;
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
    public class MunicipiosController : Controller
    {
        private readonly DataContext db;

        public MunicipiosController(DataContext dataContext)
        {
            db = dataContext;
        }

        [HttpGet]
        [Route("Index/{IdMunicipio}")]
        public async Task<JsonResult> Index([FromRoute] int IdMunicipio)
        {
            Municipios municipio= null;
            if (IdMunicipio != 0)
            {
                 municipio = db.Municipios.Include(i => i.ImagenesMunicipio).First(m => m.IdMunicipio == IdMunicipio);
                 municipio.ImagenesMunicipio = municipio.ImagenesMunicipio.OrderBy(i => i.Orden).ToList();
            }
          
           return Json(new Response { IsSuccess = true, Message = "", Result = municipio });
        }


        [HttpGet]
        [Route("Index")]
        public async Task<JsonResult> Index()
        {
            var  municipios = await db.Municipios.ToListAsync();
            return Json(new Response { IsSuccess = true, Message = "", Result = municipios });
        }


        [HttpPost, DisableRequestSizeLimit]
        [Route("Crear")]
        public async Task<JsonResult> Crear()
        {

            var files = HttpContext.Request.Form.Files;

            var postedFile = Request.Form.Files[0];

            var ruta = Path.Combine(Directory.GetCurrentDirectory(), "images/municipios");
            var form = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
       

            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    string FileName = Guid.NewGuid().ToString() + ".svg";
                    var imagenGuardada = await FilesHelper.UploadPhotoAsync(ruta, files, FileName);
                    if (imagenGuardada)
                    {
                        var municipio = new Municipios
                        {
                            IdMunicipio = int.Parse(form["IdMunicipio"]),
                            Nombre = form["Nombre"],
                            UrlImagen = "municipios/" + FileName,
                            Descripcion = form["Descripcion"],
                            Clima = form["Clima"],
                            Latitud = form["Latitud"],
                            Longitud = form["Longitud"],
                            Festividades = form["Festividades"],
                            QueHacer = form["QueHacer"],
                            Tips = form["Tips"],
                            EnFestividades = form["EnFestividades"],
                            EnQueHacer = form["EnQueHacer"],
                            EnTips = form["EnTips"],
                            EnDescripcion = form["EnDescripcion"],

                        };


                        db.Municipios.Add(municipio);
                        await db.SaveChangesAsync();
                        InsertarImagenes(form,  municipio.IdMunicipio);
                        await db.SaveChangesAsync();



                        transacction.Commit();
                    }
                    else
                    {

                        return Json(new Response { IsSuccess = false, Message = "No se logro guardar la imagen ", Result = null });
                    }


                    return Json(new Response { IsSuccess = true, Message = "Municipio creado correctamente", Result = null });

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

                var municipio = await db.Municipios.Include(s => s.ImagenesMunicipio).Where(e => e.IdMunicipio == id).FirstOrDefaultAsync();
               
               

                var vistaMunicipio = ToVistaMunicipio(municipio);


                for(int i = 0; i < municipio.ImagenesMunicipio.Count; i++)
                {
                    var e = municipio.ImagenesMunicipio.ElementAt(i);

                    vistaMunicipio.SetObjectProperty("URLImagen" + e.Orden,  e.UrlImagen, vistaMunicipio);

                    vistaMunicipio.SetObjectProperty("EsVideo" + e.Orden,  e.EsVideo.ToString(), vistaMunicipio);

                    vistaMunicipio.SetObjectProperty("EsPrincipal" + e.Orden, e.EsPrincipal.ToString(), vistaMunicipio);

                }


                return Json(new Response { IsSuccess = true, Message = string.Empty, Result = vistaMunicipio });
            }
            catch (Exception ex)
            {
                return Json(new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null });
            }
        }

        private VistaMunicipio ToVistaMunicipio(Municipios municipio)
        {
          return  new VistaMunicipio
            {
                IdMunicipio = municipio.IdMunicipio,
                Clima = municipio.Clima,
                Descripcion = municipio.Descripcion,
                Festividades = municipio.Festividades,
                Latitud = municipio.Latitud,
                Longitud = municipio.Longitud,
                Nombre = municipio.Nombre,
                UrlImagen = municipio.UrlImagen,
                QueHacer = municipio.QueHacer,
                Tips = municipio.Tips,
                EnFestividades = municipio.EnFestividades,
                EnQueHacer = municipio.EnQueHacer,
                EnTips = municipio.EnTips,
                EnDescripcion = municipio.EnDescripcion

        };
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("Editar")]
        public async Task<JsonResult> Editar()
        {

            var files = HttpContext.Request.Form.Files;
            var ruta = Path.Combine(Directory.GetCurrentDirectory(), "images/municipios");
            var form = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());

            var Id = int.Parse(form["IdMunicipio"]);
            var UrlImagen = form["UrlImagen"];
            bool archivoBorrado = false;
            var municipio = await db.Municipios.Include(s => s.ImagenesMunicipio).Where(u => u.IdMunicipio == Id).FirstOrDefaultAsync();

            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    string FileName = Guid.NewGuid().ToString() + ".svg";
                    if (files.Count() > 0)
                    {
                        archivoBorrado = FilesHelper.DeleteFile(ruta, UrlImagen.Substring(UrlImagen.IndexOf("/") + 1));
                        if (archivoBorrado)
                        {
                            var imagenGuardada = await FilesHelper.UploadPhotoAsync(ruta, files, FileName);
                            if (imagenGuardada)
                            {
                                municipio.UrlImagen = "municipios/" + FileName;
                            }
                            else
                            {
                                municipio.UrlImagen = "municipios/default.png";
                            }
                        }
                    }

                    municipio.IdMunicipio = Id;
                    municipio.Nombre = form["Nombre"];
                    municipio.Descripcion = form["Descripcion"];
                    municipio.Clima = form["Clima"];
                    municipio.Latitud = form["Latitud"];
                    municipio.Longitud = form["Longitud"];
                    municipio.Festividades = form["Festividades"];
                    municipio.QueHacer = form["QueHacer"];
                    municipio.Tips = form["Tips"];
                    municipio.EnFestividades = form["EnFestividades"];
                    municipio.EnQueHacer = form["EnQueHacer"];
                    municipio.EnTips = form["EnTips"];
                    municipio.EnDescripcion = form["EnDescripcion"];

                    db.Entry(municipio).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                    db.ImagenesMunicipio.RemoveRange(municipio.ImagenesMunicipio);
                    InsertarImagenes(form, municipio.IdMunicipio);
                    await db.SaveChangesAsync();
                    transacction.Commit();
                    return Json(new Response { IsSuccess = true, Message = "Municipio actualizado correctamente", Result = municipio });

                }
                catch (Exception ex)
                {
                    transacction.Rollback();
                    return Json(new Response { IsSuccess = false, Message = ex.Message, Result = null });
                }
            }

        }

        private void InsertarImagenes(Dictionary<string, string> form, int IdMunicipio)
        {
            if (form["URLImagen1"] != "" && form["URLImagen1"] != "null")
            {
                db.ImagenesMunicipio.Add(new ImagenesMunicipio { IdMunicipio = IdMunicipio, UrlImagen = form["URLImagen1"] ,EsPrincipal = true,Orden = 1});
            }

            if (form["URLImagen2"] != "" && form["URLImagen2"] != "null")
            {
                db.ImagenesMunicipio.Add(new ImagenesMunicipio { IdMunicipio = IdMunicipio, UrlImagen = form["URLImagen2"], EsPrincipal = true, Orden =2});
            }

            if (form["URLImagen3"] != "" && form["URLImagen3"] != "null")
            {
                db.ImagenesMunicipio.Add(new ImagenesMunicipio { IdMunicipio = IdMunicipio, UrlImagen = form["URLImagen3"], EsVideo = false, EsPrincipal = true, Orden = 3});
            }
            if (form["URLImagen4"] != "" && form["URLImagen4"] != "null")
            {
                db.ImagenesMunicipio.Add(new ImagenesMunicipio { IdMunicipio = IdMunicipio, UrlImagen = form["URLImagen4"], EsVideo = false, EsPrincipal = true, Orden = 4 });
            }

            if (form["URLImagen5"] != "" && form["URLImagen5"] != "null")
            {
                db.ImagenesMunicipio.Add(new ImagenesMunicipio { IdMunicipio = IdMunicipio, UrlImagen = form["URLImagen5"],EsVideo=false, EsPrincipal = true, Orden = 5 });
            }

            if (form["URLImagen6"] != "" && form["URLImagen6"] != "null")
            {
                db.ImagenesMunicipio.Add(new ImagenesMunicipio { IdMunicipio = IdMunicipio, UrlImagen = form["URLImagen6"], EsVideo = bool.Parse(form["EsVideo6"]), EsPrincipal = false, Orden = 6 });
            }

            if (form["URLImagen7"] != "" && form["URLImagen7"] != "null")
            {
                db.ImagenesMunicipio.Add(new ImagenesMunicipio { IdMunicipio = IdMunicipio, UrlImagen = form["URLImagen7"], EsVideo = bool.Parse(form["EsVideo7"]), EsPrincipal = false, Orden = 7 });
            }

            if (form["URLImagen8"] != "" && form["URLImagen8"] != "null")
            {
                db.ImagenesMunicipio.Add(new ImagenesMunicipio { IdMunicipio = IdMunicipio, UrlImagen = form["URLImagen8"], EsVideo = bool.Parse(form["EsVideo8"]), EsPrincipal = false, Orden = 8 });
            }
            if (form["URLImagen9"] != "" && form["URLImagen9"] != "null")
            {
                db.ImagenesMunicipio.Add(new ImagenesMunicipio { IdMunicipio = IdMunicipio, UrlImagen = form["URLImagen9"], EsVideo = bool.Parse(form["EsVideo9"]), EsPrincipal = false, Orden = 9});
            }
            if (form["URLImagen10"] != "" && form["URLImagen10"] != "null")
            {
                db.ImagenesMunicipio.Add(new ImagenesMunicipio { IdMunicipio = IdMunicipio, UrlImagen = form["URLImagen10"], EsVideo = bool.Parse(form["EsVideo10"]), EsPrincipal = false, Orden = 10 });
            }
            if (form["URLImagen11"] != "" && form["URLImagen11"] != "null")
            {
                db.ImagenesMunicipio.Add(new ImagenesMunicipio { IdMunicipio = IdMunicipio, UrlImagen = form["URLImagen11"], EsVideo = bool.Parse(form["EsVideo11"]), EsPrincipal = false, Orden = 11 });
            }
            if (form["URLImagen12"] != "" && form["URLImagen12"] != "null")
            {
                db.ImagenesMunicipio.Add(new ImagenesMunicipio { IdMunicipio = IdMunicipio, UrlImagen = form["URLImagen12"], EsVideo = bool.Parse(form["EsVideo12"]), EsPrincipal = false, Orden = 12 });
            }
            if (form["URLImagen13"] != "" && form["URLImagen13"] != "null")
            {
                db.ImagenesMunicipio.Add(new ImagenesMunicipio { IdMunicipio = IdMunicipio, UrlImagen = form["URLImagen13"], EsVideo = bool.Parse(form["EsVideo13"]), EsPrincipal = false, Orden = 13 });
            }
            if (form["URLImagen14"] != "" && form["URLImagen14"] != "null")
            {
                db.ImagenesMunicipio.Add(new ImagenesMunicipio { IdMunicipio = IdMunicipio, UrlImagen = form["URLImagen14"], EsVideo = bool.Parse(form["EsVideo14"]), EsPrincipal = false, Orden = 14 });
            }

        }
    }
}
