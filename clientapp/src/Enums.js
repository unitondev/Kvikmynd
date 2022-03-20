export const Roles = {
  SystemAdmin: 1,
  Admin: 2,
  User: 3,
}

export const RolesString = {
  SystemAdmin: 'SystemAdmin',
  Admin: 'Admin',
  User: 'User',
}

export const ApplicationPermissions = {
  All: 1,
  AddMovie: 2,
  EditMovie: 3,
}

export const RolePermissions = {
  [RolesString.SystemAdmin]: [ApplicationPermissions.All],
  [RolesString.Admin]: [ApplicationPermissions.AddMovie, ApplicationPermissions.EditMovie],
}
