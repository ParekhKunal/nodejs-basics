/** 
    * TODO: REST API -> JSON
    * 
    * * GET /api/users - List All Users
    * 
    * * GET /api/users/:userId - Get the User with ID like /api/users/1
    * 
    * * POST /api/users - Create User 
    * 
    * * PATCH /api/users/:userId - Edit the User with ID like /api/users/1 
    * 
    * * DELETE /api/users/:userId - Delete the User with ID like /api/users/1 
    * 
    * NOTE: ALl the Json response will be hard coded because no db is connected for now
    * 
    * * Use the tool Mockaroo.com which generates the fake json data for testing purpose
**/

const express = require("express");
// * import express from "express"
/**
 * * Above statement is of type ES6 to configure it rename the file name to .mjs (module js)
 * * And edit package.json by adding "type":"module" for explicit note that project follows es6
 * NOTE: By Default it is CommonJS 
 */

const fs = require("fs");
const users = require("./MOCK_DATA.json")

const app = express()
const PORT = 8000


// NOTE: Middleware
app.use((req, res, next) => {
    const log = `${Date.now()}: your request is coming from ${req.url} and method is ${req.method}\n`
    fs.appendFile("./log.txt", log, (err) => {
        if (!err) next();
    })
})

app.use(express.urlencoded({ extended: false }))

// NOTE: Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});

// NOTE: Hybrid server best practice if client or developer want to make application or client is not browser
app.get("/api/users", (req, res) => {
    // NOTE: Customer Header, best practice is to write X before your customer header
    res.setHeader("X-MyName", "Kunal Parekh")
    return res.json(users);
});

// * Client is browser only
app.get("/users", (req, res) => {

    const html = `
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }
            th, td {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Job Title</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td>${user.email}</td>
                        <td>${user.gender}</td>
                        <td>${user.job_title}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    return res.send(html);
});

// NOTE: Creating the single route for GET, PATCH, DELETE becuase the route is common i.e /api/users/:userId
app.route("/api/users/:userId")
    // * Find user by its id
    .get((req, res) => {
        // const statusCode = [{ "status": "success" }, { "status": "failed" }];
        const userId = Number(req.params.userId);
        const user = users.find(user => user.id === userId);
        const payload = [{
            statusCode: user ? "User Found Successfully" : "User with this Id is not available",
            user: user
        }];
        res.send(payload)
        // res.send(user ? [statusCode[0], user] : [statusCode[1]]);
    })
    // * Update user by its id
    .patch((req, res) => {
        // TODO: updating the user with id
        const userId = Number(req.params.userId)

        const newData = req.body;

        const userIndex = users.findIndex(user => user.id === userId);

        users[userIndex] = { ...users[userIndex], ...newData }

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            res.send({
                "status": "Updated successfully",
                "user": users
            });
        })
    })
    // * Delete user by its id
    .delete((req, res) => {
        // TODO: deleting the user with id
        const userId = Number(req.params.userId)

        const user = users.find(user => user.id === userId);
        users.pop(user)

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            res.send({
                "status": "Deleted successfully",
                "user": user
            });
        })
    });


// NOTE: Create the new user
app.post("/api/users", (req, res) => {
    // TODO: Creating the new user
    const body = req.body;

    users.push({ id: users.length + 1, ...body })

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        res.status(201).send({
            "status": "successfully created",
            "user": users
        });
    })
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});