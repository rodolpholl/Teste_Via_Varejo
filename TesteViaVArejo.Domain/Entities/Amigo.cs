using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TesteViaVArejo.Domain.Entities
{
    [Table("Tb_Amigo")]
    public class Amigo : EntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        [MaxLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres")]
        [MinLength(5, ErrorMessage = "O nome deve ter no mínimo 5 caracteres")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        [MaxLength(20, ErrorMessage = "O nome deve ter no máximo 20 caracteres")]
        [MinLength(2, ErrorMessage = "O nome deve ter no mínimo 2 caracteres")]
        public string Latitude { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        [MaxLength(20, ErrorMessage = "O nome deve ter no máximo 20 caracteres")]
        [MinLength(2, ErrorMessage = "O nome deve ter no mínimo 2 caracteres")]
        public string Longitude { get; set; }

    }
}
