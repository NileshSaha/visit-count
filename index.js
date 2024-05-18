const express = require("express");
const redis = require("redis");
// const process = require("process");

const app = express();
const client  = redis.createClient({
  host: "redis-server", // NAME IN DOCKER COMPOSER FILE
  port: 6379
});

client.set('visits', 0);

app.get('/', (req, res) => {
  // process.exit(0); // This will exit the container with status-code 0 i.e. everything is ok, but process wants to quit

  /**
   * if the status code is greater than 0 i.e. something went wrong so process wants to quit.
   */



  client.get('visits', (err, visits) => {
    res.send('Number of visits are '+ visits);
    client.set('visits', parseInt(visits) + 1);
  })
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
})