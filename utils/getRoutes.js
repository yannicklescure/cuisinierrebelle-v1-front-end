export default async () => {
  const response = await fetch('https://api.cuisinierrebelle.com/v1/state')
    .then(response => response.json())
  return response.data.recipes.map(item => `/r/${item.recipe.slug}`)
}
