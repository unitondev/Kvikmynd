export const addQueryToUrl = (key, value, pathName, search, deletedKeys = []) => {
  let searchParams = new URLSearchParams(search)

  if (deletedKeys.length > 0) {
    for (let i = 0; i < deletedKeys.length; i++) {
      searchParams.has(deletedKeys[i]) && searchParams.delete(deletedKeys[i])
    }
  }

  searchParams.has(key)
    ? searchParams.set(key, value)
    : searchParams.append(key, value)

  return {
    pathname: pathName,
    search: searchParams.toString()
  }
}
