using Microsoft.EntityFrameworkCore.Migrations;

namespace TesteViaVarejo.Migracoes.Migrations
{
    public partial class Remove_Access_Key : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccessKey",
                table: "Tb_User");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AccessKey",
                table: "Tb_User",
                nullable: true);
        }
    }
}
