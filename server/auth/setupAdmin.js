module.exports = function(db) {
    
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
        this.addUser(db, {
            username: adminUser,
            password: adminPass
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
}