export const Roles = {
  SystemAdmin: 1,
  Admin: 2,
  User: 3,
}

export const SubscriptionType = {
  Premium: 1,
}

export const SubscriptionTypeDisplayName = {
  [SubscriptionType.Premium]: 'Premium',
}

export const SubscriptionTypeDescription = {
  [SubscriptionType.Premium]: 'Cool subscription that give you absolutely nothing!'
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
  { name: 'anime' },
  { name: 'biography' },
  { name: 'western' },
  { name: 'military' },
  { name: 'detective' },
  { name: 'child' },
  { name: 'for adults' },
  { name: 'documentary' },
  { name: 'drama' },
  { name: 'the game' },
  { name: 'history' },
  { name: 'comedy' },
  { name: 'concert' },
  { name: 'short film' },
  { name: 'crime' },
  { name: 'melodrama' },
  { name: 'music' },
  { name: 'cartoon' },
  { name: 'musical' },
  { name: 'news' },
  { name: 'adventures' },
  { name: 'real tv' },
  { name: 'family' },
  { name: 'sport' },
  { name: 'talk show' },
  { name: 'thriller' },
  { name: 'horrors' },
  { name: 'fantastic' },
  { name: 'film noir' },
  { name: 'fantasy' },
  { name: 'action' },
]
