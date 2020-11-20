# patient-firestore-service

### Installation

Requires [Node.js] install node.js
Rest services are created using express.js

Install the dependencies and devDependencies and start the server.

```sh
$ cd patient-firestore-service
$ npm install prune --production
$ npm start
```

### Rest Services

```bash
GET     /getAllPatients                     # Fetch all records
GET     /getPatient/:patientId              # Fetch specific patient details
DELETE  /deletePatient/:patientId           # Delete patient details
POST    /addPatient                         # Add patient details
POST    /updatePatient:patientId            # Update patient details

## Server starts at port 9000.
```