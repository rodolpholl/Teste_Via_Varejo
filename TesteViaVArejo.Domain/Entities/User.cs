using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace TesteViaVArejo.Domain.Entities
{
    [Table("Tb_User")]
    public class User : EntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(100,ErrorMessage = "O nome deve ter no máximo 100 caracteres")]
        [MinLength(10, ErrorMessage = "O nome deve ter no mínimo 10 caracteres")]
        [Required(ErrorMessage ="Campo Obrigatório")]
        public string Nome { get; set; }

        [MaxLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres")]
        [MinLength(4, ErrorMessage = "O nome deve ter no mínimo 4 caracteres")]
        [Required(ErrorMessage = "Campo Obrigatório")]
        public string Login { get; set; }

        [MaxLength(100, ErrorMessage = "O nome deve ter no máximo 100 caracteres")]
        [MinLength(6, ErrorMessage = "O nome deve ter no mínimo 6 caracteres")]
        [Required(ErrorMessage = "Campo Obrigatório")]
        public string Senha { get; set; }

        [Required(ErrorMessage = "Campo Obrigatório")]
        public bool Ativo { get; set; }
    }
}
