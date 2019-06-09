using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using facturawebApi.DataModel;
using facturawebApi.ViewModel;


namespace facturawebApi.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UsuariosViewModel, Usuarios>()
                .ForMember(dest => dest.Usuario, opt => opt.MapFrom(src => src.Usuario))
                .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Nombre))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password))
                .ForMember(dest => dest.Id_Usuario, opt => opt.MapFrom(src => src.Id_Usuario));

            CreateMap<ClienteViewModel, Cliente>()
                .ForMember(dest => dest.id_cli, opt => opt.MapFrom(src => src.id_cli))
                .ForMember(dest => dest.cod_cli, opt => opt.MapFrom(src => src.cod_cli))
                .ForMember(dest => dest.nombre, opt => opt.MapFrom(src => src.nombre))
                .ForMember(dest => dest.nro_doc, opt => opt.MapFrom(src => src.nro_doc));

            CreateMap<CliAbonViewModel, CliAbon>()
                .ForMember(dest => dest.id_abon, opt => opt.MapFrom(src => src.id_abon))
                .ForMember(dest => dest.id_cli, opt => opt.MapFrom(src => src.id_cli))
                .ForMember(dest => dest.id_prod, opt => opt.MapFrom(src => src.id_prod))
                .ForMember(dest => dest.cantidad, opt => opt.MapFrom(src => src.cantidad))
                .ForMember(dest => dest.precio, opt => opt.MapFrom(src => src.precio))
                .ForMember(dest => dest.iobserv, opt => opt.MapFrom(src => src.iobserv));

        }
    }
}
