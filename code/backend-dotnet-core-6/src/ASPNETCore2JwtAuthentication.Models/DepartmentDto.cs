namespace Models;

public class DepartmentDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string TitleEn { get; set; }
    public string Description { get; set; }
    public string DescriptionEn { get; set; }
    public string PicName { get; set; }
    public string ShortDescription { get; set; }
    public string ShortDescriptionEn { get; set; }
    public int Order { get; set; }
}