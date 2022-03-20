export const Roles = {
  SystemAdmin: 1,
  Admin: 2,
  User: 3,
}

export const ApplicationPermissions = {
  All: 1,
  AddMovie: 2,
  EditMovie: 3,
}

export const RolePermissions = {
  [Roles.SystemAdmin]: [ApplicationPermissions.All],
  [Roles.Admin]: [ApplicationPermissions.AddMovie, ApplicationPermissions.EditMovie],
}
