https://unsplash-image-search-app.herokuapp.com/

A web application created with ReactJS

 - One-page web application
 - Clear,responsive layout
 - Unsplash.com image retrieval API implemented
 - User is able to search images by entered keywords


 Image app functionality:

 - Keyword (search) input field
 - When keyword is entered search button has to be pressed to retrieve the images
 - When images are returned app parses API response and displays images in the grid below the      search input field
 - Application shows loading indicator while images are being fetched
 - If there are no images by entered keyword user sees a message with relevant information
 - User can save a chosen query in Redux state. Application then lists saved queries, that         when pressed is repeated again and user gets pictures by saved query.
 - User can later remove a certain saved query by pressing on a red colored X.
 - User can remove all saved queries by pressing 'remove all queries' button. A popup will show    up for a double check if the user is user about removing all queries.


 Additional info:

 - Application is deployed to Heroku
 - Used tools -> React, Redux, Sass, unsplash.js
 - Unsplash API guidelines were followed