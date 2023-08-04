export default function OMDbService() {
  const apiKey: string = '720c3666'

  const fetchRecord = async (id: string) => {
    return fetch("https://www.omdbapi.com/?i="+id+"&plot=full&apiKey=" + apiKey)
  }

  const searchRecord = async (title: string) => {
    return fetch("https://www.omdbapi.com/?t="+title+"&plot=full&apiKey=" + apiKey)
  }

  return {
    fetchRecord,
    searchRecord
  }
}