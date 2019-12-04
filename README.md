# React-Native-MoviesAPP
This is a project developed in React Native using Redux as a container of the application states. This application allows you to understand the flow of a React application in addition to providing an overview of the components and development in React Native (Recover data from an external API, Navigation between views, Native Components ...)



## Setup
To run the application correctly it is necessary to have an API_TOKEN from APIDATABASE (https://www.themoviedb.org/documentation/api) which will allow the communication of the application with the API.
Update you API_TOKEN in the file : **API/TMDBapi.js**
```javascript
const API_TOKEN ="HERE_YOUR_API_TOKEN";
export function getFilmsFromApiWithSearchedText (text ,page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  }

```

In order to setup the login  with AUTH0 you must change the Auth0 credentials (domain and clientid) in login.js file with her own credentials :  **(See more at https://auth0.com/docs/quickstart/native/react-native)** 
```javascript
var credentials = { domain: 'YOUR_DOMAIN_HERE', clientId: 'YOUR_CLIENTID_HERE' }
const auth0 = new Auth0(credentials);

```

And so now we have all of our environment correctly setup :). 


## Running our Application :

Run this command into your root project directory : 
### Android Run :
```bash
react-native run-android     
```
### IOS Run:
```bash
react-native run-ios     
```
## Screenshots

![alt text](https://drive.google.com/open?id=1CmH9GH_qQj35Df4iK9vamW4VjkhjZvoS)
