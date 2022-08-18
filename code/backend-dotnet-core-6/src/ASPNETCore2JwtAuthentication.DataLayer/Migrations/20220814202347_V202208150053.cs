using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPNETCore2JwtAuthentication.DataLayer.Migrations
{
    public partial class V202208150053 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Department",
                newName: "TitleEn");

            migrationBuilder.AddColumn<string>(
                name: "DescriptionEn",
                table: "Department",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Department",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ShortDescriptionEn",
                table: "Department",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Department",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DescriptionEn",
                table: "Department");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "Department");

            migrationBuilder.DropColumn(
                name: "ShortDescriptionEn",
                table: "Department");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Department");

            migrationBuilder.RenameColumn(
                name: "TitleEn",
                table: "Department",
                newName: "Name");
        }
    }
}
