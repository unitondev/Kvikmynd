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

export const Genres = [
  { id: 1, name: 'anime' },
  { id: 2, name: 'biography' },
  { id: 3, name: 'western' },
  { id: 4, name: 'military' },
  { id: 5, name: 'detective' },
  { id: 6, name: 'child' },
  { id: 7, name: 'for adults' },
  { id: 8, name: 'documentary' },
  { id: 9, name: 'drama' },
  { id: 10, name: 'the game' },
  { id: 11, name: 'history' },
  { id: 12, name: 'comedy' },
  { id: 13, name: 'concert' },
  { id: 14, name: 'short film' },
  { id: 15, name: 'crime' },
  { id: 16, name: 'melodrama' },
  { id: 17, name: 'music' },
  { id: 18, name: 'cartoon' },
  { id: 19, name: 'musical' },
  { id: 20, name: 'news' },
  { id: 21, name: 'adventures' },
  { id: 22, name: 'real tv' },
  { id: 23, name: 'family' },
  { id: 24, name: 'sport' },
  { id: 25, name: 'talk show' },
  { id: 26, name: 'thriller' },
  { id: 27, name: 'horrors' },
  { id: 28, name: 'fantastic' },
  { id: 29, name: 'film noir' },
  { id: 30, name: 'fantasy' },
  { id: 31, name: 'action' },
]
