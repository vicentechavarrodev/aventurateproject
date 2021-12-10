﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
   public class ImagenesMunicipio
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdImagenMunicipio")]
        public int IdImagenMunicipio { get; set; }

        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "UrlImagen")]
        [JsonProperty(PropertyName = "UrlImagen")]
        public string UrlImagen { get; set; }

        [Display(Name = "EsVideo")]
        [JsonProperty(PropertyName = "EsVideo")]
        public bool EsVideo { get; set; }
        [Display(Name = "EsPrincipal")]
        [JsonProperty(PropertyName = "EsPrincipal")]
        public bool EsPrincipal { get; set; }

        [JsonProperty(PropertyName = "Orden")]
        [Display(Name = "Orden")]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        public int? Orden { get; set; }

        [Display(Name = "Municipio")]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "IdMunicipio")]
        public int IdMunicipio { get; set; }

        [JsonIgnore]
        public virtual Municipios Municipio { get; set; }
    }
}
