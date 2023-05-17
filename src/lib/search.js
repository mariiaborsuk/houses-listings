export default class Search {
  search(term, searchData) {
    if (term.trim().length >= 3) {
      return searchData.filter((item) => {
        let endIndex = term.trim().length;
        let result = term.trim().toLowerCase();
        let searchCity = item.location.city.trim().toLowerCase()

        if (searchCity.slice(0, endIndex) === result) {
          return item
        }
      })
    }

    return searchData
  }
}
