#Github-rank-app <br> <small>by Tomasz Mitlener</small> 

###descrition

<p>
The application creates a filterable list of all Angular's contributors and sorts them by amount of contributions in descending order. 
For more details, user can visit individual contributors page and  repository page.
</p>

###Launching app 
 
<p>
To start an application use the following code:
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

###Discplaimer

#####Pagination
The amount of contributors displayed in the list depends on the number repos initially fetched from API.
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
 - `introduce redux to limit the number of data requests on each home page visit`
 - `add contributor's avatars and lazy loading content i.e. with react-waypoint`
 - `limit the number of displayed table columns`
 
 
 ####contact me
 In the case of any qestions, please contact me on my e-mail: 
 - `t.mittlener@gmail.com`
 
 
 ######best regards,
 ######Tomasz Mittlener
