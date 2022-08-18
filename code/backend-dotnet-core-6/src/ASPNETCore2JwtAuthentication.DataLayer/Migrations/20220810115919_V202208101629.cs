using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPNETCore2JwtAuthentication.DataLayer.Migrations;

#pragma warning disable MA0048 // File name must match type name
public partial class V202208101629 : Migration
#pragma warning restore MA0048 // File name must match type name
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
#pragma warning disable RCS1036 // Remove unnecessary blank line.

#pragma warning disable CA1062 // Validate arguments of public methods
        migrationBuilder.CreateTable(
            name: "AboutSites",
            columns: table => new
            {
                Id = table.Column<int>(type: "int", nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                NameSite = table.Column<string>(type: "nvarchar(max)", nullable: true),
                NameSiteEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                AddressEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                Tell = table.Column<string>(type: "nvarchar(max)", nullable: true),
                TellEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                EmailEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                DescriptionSite = table.Column<string>(type: "nvarchar(max)", nullable: true),
                DescriptionSiteEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                Instagram = table.Column<string>(type: "nvarchar(max)", nullable: true),
                InstagramEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                Facebook = table.Column<string>(type: "nvarchar(max)", nullable: true),
                FacebookEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                Telegram = table.Column<string>(type: "nvarchar(max)", nullable: true),
                TelegramEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                Twitter = table.Column<string>(type: "nvarchar(max)", nullable: true),
                TwitterEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                Youtube = table.Column<string>(type: "nvarchar(max)", nullable: true),
                YoutubeEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                LinkedIn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                LinkedInEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                WhatsApp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                WhatsAppEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                UserCreatedId = table.Column<int>(type: "int", nullable: true),
                UserModifiedId = table.Column<int>(type: "int", nullable: true),
                DateCreated = table.Column<DateTime>(type: "datetime2", nullable: true),
                DateModified = table.Column<DateTime>(type: "datetime2", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AboutSites", x => x.Id);
            });
#pragma warning restore CA1062 // Validate arguments of public methods
#pragma warning restore RCS1036 // Remove unnecessary blank line.

        migrationBuilder.CreateTable(
            name: "Roles",
            columns: table => new
            {
                Id = table.Column<int>(type: "int", nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                Name = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Roles", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "Users",
            columns: table => new
            {
                Id = table.Column<int>(type: "int", nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                Username = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                IsActive = table.Column<bool>(type: "bit", nullable: false),
                LastLoggedIn = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                SerialNumber = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: true),
                Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                Family = table.Column<string>(type: "nvarchar(max)", nullable: true),
                Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                IsDisabel = table.Column<bool>(type: "bit", nullable: true),
                Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                DateCreated = table.Column<DateTime>(type: "datetime2", nullable: true),
                DateModified = table.Column<DateTime>(type: "datetime2", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Users", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "UserRoles",
            columns: table => new
            {
                UserId = table.Column<int>(type: "int", nullable: false),
                RoleId = table.Column<int>(type: "int", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.RoleId });
                table.ForeignKey(
                    name: "FK_UserRoles_Roles_RoleId",
                    column: x => x.RoleId,
                    principalTable: "Roles",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_UserRoles_Users_UserId",
                    column: x => x.UserId,
                    principalTable: "Users",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "UserTokens",
            columns: table => new
            {
                Id = table.Column<int>(type: "int", nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                AccessTokenHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                AccessTokenExpiresDateTime = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                RefreshTokenIdHash = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                RefreshTokenIdHashSource = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: true),
                RefreshTokenExpiresDateTime = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                UserId = table.Column<int>(type: "int", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_UserTokens", x => x.Id);
                table.ForeignKey(
                    name: "FK_UserTokens_Users_UserId",
                    column: x => x.UserId,
                    principalTable: "Users",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Roles_Name",
            table: "Roles",
            column: "Name",
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_UserRoles_RoleId",
            table: "UserRoles",
            column: "RoleId");

        migrationBuilder.CreateIndex(
            name: "IX_UserRoles_UserId",
            table: "UserRoles",
            column: "UserId");

        migrationBuilder.CreateIndex(
            name: "IX_Users_Username",
            table: "Users",
            column: "Username",
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_UserTokens_UserId",
            table: "UserTokens",
            column: "UserId");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
#pragma warning disable CA1062 // Validate arguments of public methods
        migrationBuilder.DropTable(
            name: "AboutSites");
#pragma warning restore CA1062 // Validate arguments of public methods

        migrationBuilder.DropTable(
            name: "UserRoles");

        migrationBuilder.DropTable(
            name: "UserTokens");

        migrationBuilder.DropTable(
            name: "Roles");

        migrationBuilder.DropTable(
            name: "Users");
    }
}
