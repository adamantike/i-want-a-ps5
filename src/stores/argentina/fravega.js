import { ARGENTINA, ARGENTINIAN_PESOS } from '../../constants/index.js'

export default {
  vendor: 'Fravega',
  slug: 'fravega-ar',
  url: 'https://www.fravega.com/l/?categorias=videojuegos/consolas&keyword=playstation%205',
  logoPath: 'assets/img/fravega-logo.webp',
  country: ARGENTINA,
  currency: ARGENTINIAN_PESOS,
  usesPagination: true,
  getPageNumberQueryString: ({ pageNumber }) => `&page=${pageNumber}`,
  checkEmptyPage: async ({ page }) => {
    const notFoundElement = await page.$('svg[class^=BannerNoSuggestion__NotFoundImageStyled]')
    return !!notFoundElement
  },
  getAvailableItems: async ({ page }) => {
    const items = await page.$$('article[class^=ProductCard__Card-shopping-ui]')
    const ps5Items = []

    for (const item of items) {
      const title = await item.$eval('span[class^=PieceTitle-shopping-ui]', element => element.innerText)
      const url = await item.$eval('a', element => element.href)
      const price = await item.$eval('span[class^=SalePrice-shopping-ui]', element => element.innerText)
      const thumbnail = await item.$eval('img', element => element.src)
      ps5Items.push({
        title,
        url,
        price,
        thumbnail
      })
    }
    return ps5Items
  }
}
