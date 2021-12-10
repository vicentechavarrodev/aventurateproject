using Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace WebApp.Class
{
    public class VistaSede: Sedes
    {
        public int key { get; set; }

        [JsonProperty(PropertyName = "CategoriasSubcategorias")]
        public new List<VistaCategoSubcatego> CategoriasSubcategorias { get; set; }

        [JsonProperty(PropertyName = "URLImagen1")]
        public string URLImagen1 { get; set; }
        [JsonProperty(PropertyName = "URLImagen2")]
        public string URLImagen2 { get; set; }
        [JsonProperty(PropertyName = "URLImagen3")]
        public string URLImagen3 { get; set; }
        [JsonProperty(PropertyName = "URLImagen4")]
        public string URLImagen4 { get; set; }
        [JsonProperty(PropertyName = "URLImagen5")]
        public string URLImagen5 { get; set; }
      
        [JsonProperty(PropertyName = "URLImagen6")]
        public string URLImagen6 { get; set; }
        [JsonProperty(PropertyName = "URLImagen7")]
        public string URLImagen7 { get; set; }
        [JsonProperty(PropertyName = "URLImagen8")]
        public string URLImagen8 { get; set; }
        [JsonProperty(PropertyName = "URLImagen9")]
        public string URLImagen9 { get; set; }

        [JsonProperty(PropertyName = "URLImagen10")]
        public string URLImagen10 { get; set; }
        [JsonProperty(PropertyName = "URLImagen11")]
        public string URLImagen11 { get; set; }
        [JsonProperty(PropertyName = "URLImagen12")]
        public string URLImagen12 { get; set; }
        [JsonProperty(PropertyName = "URLImagen13")]
        public string URLImagen13 { get; set; }
        [JsonProperty(PropertyName = "URLImagen14")]
        public string URLImagen14 { get; set; }

        [JsonProperty(PropertyName = "EsVideo1")]
        public bool EsVideo1 { get; set; }
        [JsonProperty(PropertyName = "EsVideo2")]
        public bool EsVideo2 { get; set; }
        [JsonProperty(PropertyName = "EsVideo3")]
        public bool EsVideo3 { get; set; }
        [JsonProperty(PropertyName = "EsVideo5")]
        public bool EsVideo5 { get; set; }
        [JsonProperty(PropertyName = "EsVideo4")]
        public bool EsVideo4 { get; set; }
        [JsonProperty(PropertyName = "EsVideo6")]
        public bool EsVideo6 { get; set; }
        [JsonProperty(PropertyName = "EsVideo7")]
        public bool EsVideo7 { get; set; }
        [JsonProperty(PropertyName = "EsVideo8")]
        public bool EsVideo8 { get; set; }
        [JsonProperty(PropertyName = "EsVideo9")]
        public bool EsVideo9 { get; set; }
        [JsonProperty(PropertyName = "EsVideo10")]
        public bool EsVideo10 { get; set; }
        [JsonProperty(PropertyName = "EsVideo11")]
        public bool EsVideo11 { get; set; }
        [JsonProperty(PropertyName = "EsVideo12")]
        public bool EsVideo12 { get; set; }
        [JsonProperty(PropertyName = "EsVideo13")]
        public bool EsVideo13 { get; set; }
        [JsonProperty(PropertyName = "EsVideo14")]
        public bool EsVideo14 { get; set; }


        [JsonProperty(PropertyName = "EsPrincipal1")]
        public bool EsPrincipal1 { get; set; }
        [JsonProperty(PropertyName = "EsPrincipal2")]
        public bool EsPrincipal2 { get; set; }
        [JsonProperty(PropertyName = "EsPrincipal3")]
        public bool EsPrincipal3 { get; set; }
        [JsonProperty(PropertyName = "EsPrincipal5")]
        public bool EsPrincipal5 { get; set; }
        [JsonProperty(PropertyName = "EsPrincipal4")]
        public bool EsPrincipal4 { get; set; }
        [JsonProperty(PropertyName = "EsPrincipal6")]
        public bool EsPrincipal6 { get; set; }
        [JsonProperty(PropertyName = "EsPrincipal7")]
        public bool EsPrincipal7 { get; set; }
        [JsonProperty(PropertyName = "EsPrincipal8")]
        public bool EsPrincipal8 { get; set; }
        [JsonProperty(PropertyName = "EsPrincipal9")]
        public bool EsPrincipal9 { get; set; }
        [JsonProperty(PropertyName = "EsPrincipal10")]
        public bool EsPrincipal10 { get; set; }
        [JsonProperty(PropertyName = "EsPrincipal11")]
        public bool EsPrincipal11 { get; set; }
        [JsonProperty(PropertyName = "EsPrincipal12")]
        public bool EsPrincipal12 { get; set; }
        [JsonProperty(PropertyName = "EsPrincipal13")]
        public bool EsPrincipal13 { get; set; }
        [JsonProperty(PropertyName = "EsPrincipal14")]
        public bool EsPrincipal14 { get; set; }
        public new List<Categorias> Categorias { get; set; }
        public new List<TiposSede> TiposSede { get; set; }
        public new List<Municipios> Municipios { get; set; }
        [JsonProperty(PropertyName = "IdCategoria")]
        public new int IdCategoria { get; set; }

        [JsonProperty(PropertyName = "SubCategoria")]
        public new SubCategorias SubCategoria { get; set; }

        [JsonProperty(PropertyName = "Municipio")]
        public new Municipios Municipio { get; set; }

        [JsonProperty(PropertyName = "TipoSede")]
        public new TiposSede TipoSede { get; set; }



        public void SetObjectProperty(string propertyName, string value, object obj)
        {
            PropertyInfo propertyInfo = obj.GetType().GetProperty(propertyName);
            string tipo = propertyInfo.GetType().Name;
            if (propertyInfo.PropertyType.Name == "String")
            {
                if (propertyInfo != null)
                {
                    propertyInfo.SetValue(obj, value, null);
                }

            }
            else if (propertyInfo.PropertyType.Name == "Boolean")
            {
                if (propertyInfo != null)
                {
                    propertyInfo.SetValue(obj, Boolean.Parse(value), null);
                }
            }

        }
    }
}
