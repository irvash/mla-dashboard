using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPNETCore2JwtAuthentication.DataLayer.Migrations
{
    public partial class V202208150011 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LogoName",
                table: "Department",
                newName: "PicName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PicName",
                table: "Department",
                newName: "LogoName");
        }
    }
}
