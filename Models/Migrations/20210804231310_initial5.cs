using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EnDescripcion",
                table: "Municipios",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EnFestividades",
                table: "Municipios",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EnQueHacer",
                table: "Municipios",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EnTips",
                table: "Municipios",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnDescripcion",
                table: "Municipios");

            migrationBuilder.DropColumn(
                name: "EnFestividades",
                table: "Municipios");

            migrationBuilder.DropColumn(
                name: "EnQueHacer",
                table: "Municipios");

            migrationBuilder.DropColumn(
                name: "EnTips",
                table: "Municipios");
        }
    }
}
