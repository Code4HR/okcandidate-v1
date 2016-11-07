'use strict'

const fs = require('fs')
const path = require('path')

const file = process.argv[2]

/*
  @name sqlJSONtoJSmodule
  @usage
    node sqlJSONtoJSmodule filename
  @description
    Given a text file containing records that look like:
    ```
    row_to_json
    -------------------------------------------------------------------------------------------------------------------------------------------------------
    ...
    {"id":2707,"survey_id":1,"geography_id":1,"user_email":null,"user_phone":null,"neighborhood":"Southern Woods/Redmill Farms"}
    {"id":2708,"survey_id":1,"geography_id":1,"user_email":null,"user_phone":null,"neighborhood":"Ocean Lakes"}
    {"id":2709,"survey_id":1,"geography_id":1,"user_email":null,"user_phone":null,"neighborhood":"Abingdon Village"}
    {"id":2710,"survey_id":1,"geography_id":1,"user_email":null,"user_phone":null,"neighborhood":"Southern Woods/Redmill Farms"}
    ...
    (3730 rows)

    ```
    Removes formatting created by Postgres and creates a JS module with an array of objects.
    If the input file is named 'output.txt', the resulting JS module is named 'output.js'

    ```
    module.exports = [
      {"id":2707,"survey_id":1,"geography_id":1,"user_email":null,"user_phone":null,"neighborhood":"Southern Woods/Redmill Farms"}
      {"id":2708,"survey_id":1,"geography_id":1,"user_email":null,"user_phone":null,"neighborhood":"Ocean Lakes"}
      {"id":2709,"survey_id":1,"geography_id":1,"user_email":null,"user_phone":null,"neighborhood":"Abingdon Village"}
      {"id":2710,"survey_id":1,"geography_id":1,"user_email":null,"user_phone":null,"neighborhood":"Southern Woods/Redmill Farms"}
    ]
    ```
*/

fs.readFile(path.resolve(__dirname, file), 'utf8', (err, lines) => {
  const records = `module.exports = [${lines.split('\n').slice(2, -3)}]`
  const destination = `${path.parse(file).name}.js`
  fs.writeFile(destination, records, err => {
    if (err) console.log(err);
    console.log(`${file} converted to a JS module and saved to ${destination}`);
  })
})
