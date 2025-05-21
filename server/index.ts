import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { generateUUID } from './helper';

const app = express();

const PORT = 3030;

type LogType = { address: string; message: string; [key: string]: any };

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }

  next();
});


// schema
const schema = buildSchema(`
  type Logs {
    id: String
    address: String
    message: String
  }

  type LogCount {
    address: String
    url: String
    count: Int!
  }

  type LogsData {
    data: [Logs]
    uniqueAddressesSize: Int
    topThreeVisitedURLs: [LogCount]
    mostActiveIPAddresses: [LogCount]
  }
  
  type Query {
    getLogFile(fileName: String!): LogsData
  }
  `)

// resolver
const rootValue = {
  getLogFile: ({fileName}: {fileName: string}) => {
    const pathName = path.join(__dirname, `../data/${fileName}`);
    if(!fs.existsSync(pathName)) {
      throw new Error("Log file not found.")
    }

    // Convert the logs from string to object
    const logsData = fs.readFileSync(pathName, "utf-8").split('\n').map((log) => {
      const logSplit = log.split(/ - - | - /);

      if(logSplit[1]) {
        return {
          id: generateUUID(),
          address: logSplit[0],
          message: logSplit[1]
        }
      }
    })
    .filter(log => log !== undefined);

    // Below code is to identify unique addresses
    const uniqueAddresses = logsData.reduce<Record<string, LogType>>((acc, curr) => {
      if(!acc[curr.address]) {
        acc[curr.address] = curr
      }
      return acc;
    }, {})

    //Below is the code to identify top 3 visited URLS
    const visitedURLsCount = logsData.reduce<Record<string, number>>((acc, curr) => {
      const message = curr.message;
      const url = message.slice(message.indexOf("GET")+3, message.indexOf("HTTP")).trim()
      acc[url] = (acc[url] || 0) + 1;
      return acc;
    }, {})
    
    // Code to fetch top three visited urls as per their count
    const topThreeVisitedURLs = Object.entries(visitedURLsCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(val => ({ url: val[0], count: val[1]}))

    // code to identify and fetch top three IP Addresses
    const mostActiveIPAddresses = Object.entries(logsData.reduce<Record<string, number>>((acc, curr) => {
      acc[curr.address] = (acc[curr.address] || 0) + 1;
      return acc;
    }, {}))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(val => ({
      address: val[0],
      count: val[1]
    }))

    return {
      data: logsData,
      uniqueAddressesSize: Object.values(uniqueAddresses).length,
      topThreeVisitedURLs,
      mostActiveIPAddresses
    };
  }
}

app.use("/graphql/logs", graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}))

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})

export default app;