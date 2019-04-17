/**
 * @param con MySQL Connection
 * @param onSuccess callback on success
 */
module.exports = function(con, onSuccess) {
    con.connect(function(err) {
        if(err) throw err;

        // Create tables
        multiQuery([
            `CREATE TABLE IF NOT EXISTS login_user(
                username VARCHAR(40) PRIMARY KEY,
                password_hash VARCHAR(255) NOT NULL,
                is_admin TINYINT
            )`,
            `CREATE TABLE IF NOT EXISTS prize(
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(80),
                value DECIMAL(16,2),
                quantity INT
            )`,
            `CREATE TABLE IF NOT EXISTS image(
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                filename VARCHAR(255) NOT NULL,
                width INT,
                height INT
            )`,
            `CREATE TABLE IF NOT EXISTS size(
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                width INT,
                height INT
            )`,
            `CREATE TABLE IF NOT EXISTS cropped_image(
                image_id BIGINT,
                size_id BIGINT,
                PRIMARY KEY(image_id, size_id),
                FOREIGN KEY(image_id) REFERENCES image(id),
                FOREIGN KEY(size_id) REFERENCES size(id)
            )`,
            `CREATE TABLE IF NOT EXISTS card_template(
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(80),
                top_image BIGINT,
                top_color VARCHAR(20),
                size BIGINT,
                FOREIGN KEY(top_image) REFERENCES image(id),
                FOREIGN KEY(size) REFERENCES size(id)
            )`,
            `CREATE TABLE IF NOT EXISTS campaign(
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(80),
                template BIGINT,
                start_date DATE,
                end_date DATE,
                url VARCHAR(128),
                FOREIGN KEY(template) REFERENCES card_template(id)
            )`,
            `CREATE TABLE IF NOT EXISTS card_result(
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(80),
                image BIGINT NOT NULL,
                campaign BIGINT NOT NULL,
                prize BIGINT,
                FOREIGN KEY(image) REFERENCES image(id),
                FOREIGN KEY(campaign) REFERENCES campaign(id),
                FOREIGN KEY(prize) REFERENCES prize(id)
            )`,
            `CREATE TABLE IF NOT EXISTS participant(
                id VARCHAR(80),
                result BIGINT,
                has_claimed TINYINT,
                FOREIGN KEY(result) REFERENCES card_result(id)
            )`
        ], onSuccess);
    });

    function multiQuery(argsArray, onSuccess, idx = 0) {

        if(idx >= argsArray.length)
            return onSuccess ? onSuccess() : null;

        var args = argsArray[idx];
        args = Array.isArray(args) ? args : [args];
        var query    = args[0];
        var values   = args[1];
        var callback = args[2] || defaultCallback;
        con.query(query, values, function(err, result) {
            callback(err, result);
            multiQuery(argsArray, onSuccess, idx + 1);
        });
    };

    function defaultCallback(err) {
        if(err) throw err;
    }
}