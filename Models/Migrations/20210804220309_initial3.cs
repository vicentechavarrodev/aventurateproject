using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EnDescripcion",
                table: "Sedes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EnTips",
                table: "Sedes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnDescripcion",
                table: "Sedes");

            migrationBuilder.DropColumn(
                name: "EnTips",
                table: "Sedes");
        }
    }
}
