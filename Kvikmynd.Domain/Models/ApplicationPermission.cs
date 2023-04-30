using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Kvikmynd.Domain.Models;

public class ApplicationPermissionEntity
{
    [Key]
    public ApplicationPermission Id { get; set; }
    
    [Required]
    [MaxLength(64)]
    public string Name { get; set; }
    
    public virtual ICollection<ApplicationRole> Roles { get; set; }
}