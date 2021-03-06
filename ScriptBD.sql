USE [testeviavarejo]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 15/06/2018 15:53:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Tb_Amigo]    Script Date: 15/06/2018 15:53:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tb_Amigo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [nvarchar](100) NOT NULL,
	[Latitude] [nvarchar](20) NOT NULL,
	[Longitude] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_Tb_Amigo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Tb_User]    Script Date: 15/06/2018 15:53:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tb_User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [nvarchar](100) NOT NULL,
	[Login] [nvarchar](100) NOT NULL,
	[Senha] [nvarchar](100) NOT NULL,
	[Ativo] [bit] NOT NULL,
 CONSTRAINT [PK_Tb_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180613235820_initial', N'2.1.0-rtm-30799')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180614031123_Include_Access_key', N'2.1.0-rtm-30799')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20180614034141_Remove_Access_Key', N'2.1.0-rtm-30799')
SET IDENTITY_INSERT [dbo].[Tb_Amigo] ON 

INSERT [dbo].[Tb_Amigo] ([Id], [Nome], [Latitude], [Longitude]) VALUES (1, N'Rodolpho Loreto', N'-22.8928776', N'-47.0534797')
INSERT [dbo].[Tb_Amigo] ([Id], [Nome], [Latitude], [Longitude]) VALUES (2, N'Juliano Almeida', N'-22.8908816', N'-47.0492525')
INSERT [dbo].[Tb_Amigo] ([Id], [Nome], [Latitude], [Longitude]) VALUES (3, N'Cesar Kin', N'-22.8440903', N'-47.0537028')
INSERT [dbo].[Tb_Amigo] ([Id], [Nome], [Latitude], [Longitude]) VALUES (4, N'Maria Zilda', N'-22.946747', N'-47.0854953')
INSERT [dbo].[Tb_Amigo] ([Id], [Nome], [Latitude], [Longitude]) VALUES (5, N'José de Souza', N'-22.9145159', N'-47.06596')
INSERT [dbo].[Tb_Amigo] ([Id], [Nome], [Latitude], [Longitude]) VALUES (6, N'Evandro Almeida', N'-23.0369321', N'-47.0110234')
INSERT [dbo].[Tb_Amigo] ([Id], [Nome], [Latitude], [Longitude]) VALUES (7, N'Alessandro de Castro', N'-23.041715', N'-47.0121054')
INSERT [dbo].[Tb_Amigo] ([Id], [Nome], [Latitude], [Longitude]) VALUES (8, N'Marcia Andrade', N'-23.5872762', N'-46.6599838')
INSERT [dbo].[Tb_Amigo] ([Id], [Nome], [Latitude], [Longitude]) VALUES (9, N'Aurora Maia', N'-23.5865328', N'-46.6578967')
INSERT [dbo].[Tb_Amigo] ([Id], [Nome], [Latitude], [Longitude]) VALUES (10, N'Ariete Loreto', N'-22.8464201', N'-43.0813064')
SET IDENTITY_INSERT [dbo].[Tb_Amigo] OFF
SET IDENTITY_INSERT [dbo].[Tb_User] ON 

INSERT [dbo].[Tb_User] ([Id], [Nome], [Login], [Senha], [Ativo]) VALUES (1, N'Rodolpho Loreto', N'rodolpholl', N'rloreto123', 1)
INSERT [dbo].[Tb_User] ([Id], [Nome], [Login], [Senha], [Ativo]) VALUES (2, N'Rodolpho Valente', N'rloreto', N'12312', 1)
INSERT [dbo].[Tb_User] ([Id], [Nome], [Login], [Senha], [Ativo]) VALUES (3, N'Marcelo Alves', N'malves', N'12345', 1)
INSERT [dbo].[Tb_User] ([Id], [Nome], [Login], [Senha], [Ativo]) VALUES (4, N'João Silva 1', N'jsilva', N'123456', 0)
SET IDENTITY_INSERT [dbo].[Tb_User] OFF
