# Folder Structure
### Before running the app its important to understand the folder structure
##### _Assumption: Since its a small app hence added both backend and frontend in one single repo_
```
|  
| - server - here the backend of the app resides  
| - frontend - here the frontend of the app resides  
| - data - this is the log data file  
|
```

# How to run the server

1. Open Terminal and navigate to "server" folder
2. Run commands:
   1. ```npm install```
   2. ```npm run dev``` for running the server
   3. ```npm run test``` for running test cases
3. It will start server on "localhost:3030"
4. To open the graphql interface navigate to [http://localhost:3030/graphql/logs](http://localhost:3030/graphql/logs)

Add below query to graphql interface and hit play:
```
query {
  getLogFile(fileName: "data.log") {
    data {
      id
      address
      message
    }
    uniqueAddressesSize
    topThreeVisitedURLs {
      url
      count
    }
    mostActiveIPAddresses {
      address
      count
    }
  }
}
```

# How to run the frontend app

1. Open a new terminal
2. Run below commands:
   1. ```npm install```
   2. ```npm run dev``` for running the dev environment
   3. ```npm run test``` for running the test cases
3. It will start the frontend app at http://localhost:5173/  
    _Please note: if there is already another instance of vite running locally it will change the port. This will reflect on the terminal_

# Assumptions

1. Refined data at the server itself and sending it to the client instead of refining it at frontend.
> **Reason:** It is ideal to refine the data at server. Its helpful in sending the consistent data at all FE platforms (web, ios & android)
2. Kept frontend only to accept the data and display it accordingly.
3. Used Vite at frontend for building the app because its fast, light and is good for small apps.
4. Kept backend simple with Nodejs, express and graphql. 
