'use strict'

const fs = require('fs')
const path = require('path')

const file = process.argv[2]

/*
  @name sqlJSONtoJSmodule
  @usage
    node sqlJSONtoJSmodule.js filename
  @description

    To get a dump of survey_records, connect to the OKC production database using psql.

    ```
      psql -h okcandidate.code4hr.org -p 5432 -U okc
    ```

    You will be prompted to enter the password for the OKC user.
    To save the results of your query to a local file:

    ```
      \0 output.txt
      SELECT row_to_json(survey_response) FROM survey_response | response;
      \q
    ``

    This creates a file `output.txt` that looks like:

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
    This script will remove formatting created by Postgres and create a JS module containing an array of objects.

    ```
      node sqlJSONtoJSmodule.js output.txt
    ```

    If the input file is named 'output.txt', the resulting JS module is named 'output.js'

    ```
      module.exports = [
        ...
        {"id":2707,"survey_id":1,"geography_id":1,"user_email":null,"user_phone":null,"neighborhood":"Southern Woods/Redmill Farms"},
        {"id":2708,"survey_id":1,"geography_id":1,"user_email":null,"user_phone":null,"neighborhood":"Ocean Lakes"},
        {"id":2709,"survey_id":1,"geography_id":1,"user_email":null,"user_phone":null,"neighborhood":"Abingdon Village"},
        {"id":2710,"survey_id":1,"geography_id":1,"user_email":null,"user_phone":null,"neighborhood":"Southern Woods/Redmill Farms"},
        ...
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
