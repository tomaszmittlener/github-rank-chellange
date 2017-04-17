#Github-rank-app <br> <small>by Tomasz Mitlener</small> 

###Descrition

<p>
The application creates a filterable list of Angular's contributors and sorts them by amount of contributions in descending order. 
User may access the profile page of each contributor which contains his detailed info and all Angular's repos he contributed to.
User may also navigate to repository details page where he can find other contributors.
</p>

###Launching app 
 
<p>
To start the application use the following code:
</p> 
 
``` 
git clone https://github.com/tomaszmittlener/github-rank-chellange.git
cd github-rank-app-tomasz-mittlener
npm install 
npm run serve 
``` 

and navigate to the [http://localhost:8000](http://localhost:8000 ) in your browser.

###Requirements 
 
- `git`, 
- `Node.js`, 
- `npm`,


###Used tools 
 
The application has been created with use of yeoman's `generator-react-webpack`. 
Moreover, the following tools have been added during the app development: 

- `react-router-dom`, 
- `node-sass` and `sass-loader`, 
- `susy`,
- `modularscale-sass`
- `loadash`,
- `react-icons`
- `redux`

###Disclaimer

#####UPDATE
The application has been modified to display Angular's repositories only (previously, user had an access to all contributor's repositories on the Contributor's Page).
For this purpose, Redux state container has been implemented to the application. 
The application fetches all  the needed data only once during the visit, stores it in the Redux store and enables the user to freely browse through the list without the need of fetching all the information each time he visits the Home Page.
The data will be lost if the user leaves or refreshes the page. All Redux actions have been described in the separate readme in `./actions/README.md`

#####Pagination
The amount of contributors displayed in the list depends on the number of repos initially fetched from API.
For performance purposes, the application has been set up to download only first page of 30 repos, which is a default API's pagination setup. 
The remaining repos can be retrieved by traversing through all pages either based on the total number of Angular's repos or information  retrieved from the request's link header.
Number of results per page can be increased by changing the request parameters.

#####Error handlers
The application is provided only with some basic error handlers. Typical errors will be displayed in the console. 
More complex error handlers should be implemented in the future. 

#####Authentication
The application uses Auth0 protocol for authentication. The rate limit amounts to 5000/h and is associated with user's IP.

#####Further development
Due to the limited time, application contains only basic features, enabling user to browse through the contributor's ranking list. 
Plans for the future development:
 - `extend scope of the application by letting the user choose the browsed repo, other than Angular`
 - `add contributor's avatars and lazy loading content i.e. with react-waypoint`
 - `limit the number of displayed table columns`
 
 
 ####contact me
 In the case of any qestions, please contact me on my e-mail: 
 - `t.mittlener@gmail.com`
 
 
 ######best regards,
 ######Tomasz Mittlener
