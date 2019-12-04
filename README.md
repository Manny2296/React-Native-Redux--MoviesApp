# React-Native-MoviesAPP
This is a project developed in React Native using Redux as a container of the application states. This application allows you to understand the flow of a React application in addition to providing an overview of the components and development in React Native (Recover data from an external API, Navigation between views, Native Components ...)

## Setup
To run the application correctly it is necessary to have an API_TOKEN from APIDATABASE (https://www.themoviedb.org/documentation/api) which will allow the communication of the application with the API. 
```javascript
const API_TOKEN ="HERE_YOUR_API_TOKEN";
export function getFilmsFromApiWithSearchedText (text ,page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  }

```
