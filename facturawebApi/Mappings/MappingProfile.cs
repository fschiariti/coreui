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
                .ForMember(dest => dest.usuario, opt => opt.MapFrom(src => src.usuario))
                .ForMember(dest => dest.nombre, opt => opt.MapFrom(src => src.nombre))
                .ForMember(dest => dest.email, opt => opt.MapFrom(src => src.email))
                .ForMember(dest => dest.password, opt => opt.MapFrom(src => src.password))
                .ForMember(dest => dest.id_usuario, opt => opt.MapFrom(src => src.id_usuario))
                .ForMember(dest => dest.id_empre, opt => opt.MapFrom(src => src.id_empre));

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

            CreateMap<HVentaViewModel, HVenta>()
                .ForMember(dest => dest.id_comp, opt => opt.MapFrom(src => src.id_comp))
                .ForMember(dest => dest.id_cli, opt => opt.MapFrom(src => src.id_cli))
                .ForMember(dest => dest.referencia, opt => opt.MapFrom(src => src.referencia))
                .ForMember(dest => dest.imp_tot, opt => opt.MapFrom(src => src.imp_tot))
                .ForMember(dest => dest.observ, opt => opt.MapFrom(src => src.observ))
                .ForMember(dest => dest.id_empre, opt => opt.MapFrom(src => src.id_empre));

        }
    }
}
