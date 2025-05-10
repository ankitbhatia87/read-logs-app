import request from "supertest";
import app from "../index";

const TEST_FILE_NAME = 'test.log';

describe("GraphQL Api - getLogFile", () => {
  it("Should return parsed log data with metadata", async() => {
    const response = await request(app)
    .post('/graphql/logs')
    .send({
      query: `
        query {
          getLogFile(fileName: "${TEST_FILE_NAME}") {
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
      `
    })

    expect(response.status).toBe(200);

    const result = response.body.data.getLogFile;

    expect(result.data).toHaveLength(3);
  });

  it("Should return error for non-existant log files", async() => {
    const response = await request(app)
    .post("/graphql/logs")
    .send({
      query: `
        query {
          getLogFile(fileName: "unknown.log") {
            data {
              id
            }
          }
        }
      `
    })
    expect(response.body.errors).toBeDefined()
    expect(response.body.errors[0].message).toBe("Log file not found.")
  })
})