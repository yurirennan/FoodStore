const db = require("../../config/db");


module.exports = {
    create(data) {
        const query = `
            INSERT INTO products (
                name,
                category_id,
                user_id,
                description,
                old_price,
                price,
                quantity,
                status
            ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `;

        data.price = data.price.replace(/\D/g, "");

        const values = [
            data.name,
            data.category_id,
            data.user_id || 1,
            data.description,
            data.old_price || data.price,
            data.price,
            data.quantity,
            data.status || 1,
        ];

        return db.query(query, values);
    },
    find(id) {
        return db.query(`
            SELECT * FROM products WHERE id = $1
        `, [id]);
    },
    update(data) {
        const query = `
            UPDATE products SET
                name = ($1),
                category_id = ($2),
                user_id = ($3),
                description = ($4),
                old_price = ($5),
                price = ($6),
                quantity = ($7),
                status = ($8)
            WHERE id = $9
        `

        const values = [
            data.name,
            data.category_id,
            data.user_id,
            data.description,
            data.old_price,
            data.price,
            data.quantity,
            data.status,
            data.id
        ];

        return db.query(query, values);
    },
    delete(id) {
        const query = `
            DELETE FROM products
            WHERE id = $1
        `

        const value = [id];

        return db.query(query, value);
    },
    files(id) {
        return db.query(`
            SELECT * FROM files WHERE product_id = $1
        `, [id]);
    }
}