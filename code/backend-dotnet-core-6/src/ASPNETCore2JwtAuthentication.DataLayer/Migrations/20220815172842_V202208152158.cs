using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPNETCore2JwtAuthentication.DataLayer.Migrations
{
    public partial class V202208152158 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AltAttributeEn",
                table: "Slider");

            migrationBuilder.DropColumn(
                name: "LinkEn",
                table: "Slider");

            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "Slider");

            migrationBuilder.DropColumn(
                name: "PicNameEn",
                table: "Slider");

            migrationBuilder.AddColumn<int>(
                name: "Lang",
                table: "Slider",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lang",
                table: "Slider");

            migrationBuilder.AddColumn<string>(
                name: "AltAttributeEn",
                table: "Slider",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LinkEn",
                table: "Slider",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "Slider",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PicNameEn",
                table: "Slider",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }
    }
}
