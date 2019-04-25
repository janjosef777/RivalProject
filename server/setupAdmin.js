const db = require('./db');
const auth = require('./auth');

// -- Create admin --

const adminUser = process.env.ADMIN_USER;
const adminPass = process.env.ADMIN_PASS;

if(adminUser === undefined)
    throw new ReferenceError("Couldn't find ADMIN_USER environment variable");
if(adminPass === undefined)
    throw new ReferenceError("Couldn't find ADMIN_PASS environment variable");

// 1. Remove admin
db.admin.delete(err => {
    if(err) throw err;

    // 2. Create user
    auth.addUser({
        username: adminUser,
        password: adminPass
    }, {
        replace: true
    }, err => {
        if(err) throw err;

        // 3. Assign as admin
        db.admin.assign(adminUser, err => {
            if(err) throw err;

            // 4. Success
            console.log("Created admin");
        })
    })
});