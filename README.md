first you will have to start the json server for database,
it is stored /data/db.json.
to start json server open teminal and write the commend

`npx json-server --watch data/db.json --port 8000`

type `y` if prompted to install the package
choose the preferable port.
keep the terminal open and running

now from node server folder run the server in new terminal and keep it open and running . the server should be running on port 3000

next to run the web-app
open new terminal and write the command
`yarn start`
this should be running on port 3001