using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EsPrincipal",
                table: "ImagenesMunicipio",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "EsVideo",
                table: "ImagenesMunicipio",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "EsPrincipal",
                table: "ImagenesEmpresa",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EsPrincipal",
                table: "ImagenesMunicipio");

            migrationBuilder.DropColumn(
                name: "EsVideo",
                table: "ImagenesMunicipio");

            migrationBuilder.DropColumn(
                name: "EsPrincipal",
                table: "ImagenesEmpresa");
        }
    }
}
