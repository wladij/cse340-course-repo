import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, category_name
      FROM public.categories;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (id) => {

    const query = `
        SELECT
            category_id,
            category_name
        FROM categories
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

const getAllCategoriesByProjectId = async (id) => {
    const query = `
        SELECT
            c.category_id,
            c.category_name
        FROM project_categories p
        JOIN categories c
            ON p.category_id = c.category_id
        WHERE p.project_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows;
};

export {getAllCategories, getCategoryById, getAllCategoriesByProjectId} 