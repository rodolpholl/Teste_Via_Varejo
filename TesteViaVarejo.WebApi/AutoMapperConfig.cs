using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TesteViaVarejo.WebApi.Model;
using TesteViaVArejo.Domain.Entities;

namespace TesteViaVarejo.WebApi
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            #region Domain To Model

            CreateMap<Amigo, AmigoModel>().ReverseMap();
            CreateMap<User, UserModel>().ReverseMap();

            #endregion

            #region Model to Domain

            CreateMap<LoginAuthModel, User>().ForMember(dest => dest.Login, opt => opt.MapFrom(src => src.Login));
            CreateMap<LoginAuthModel, User>().ForMember(dest => dest.Senha, opt => opt.MapFrom(src => src.Senha));

            #endregion
        }

    }
}
