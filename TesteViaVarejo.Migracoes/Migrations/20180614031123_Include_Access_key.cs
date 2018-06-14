using Microsoft.EntityFrameworkCore.Migrations;

namespace TesteViaVarejo.Migracoes.Migrations
{
    public partial class Include_Access_key : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AccessKey",
                table: "Tb_User",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccessKey",
                table: "Tb_User");
        }
    }
}
