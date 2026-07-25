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

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

const createCategory = async (category_name) => {
    const query = `
      INSERT INTO categories (category_name)
      VALUES ($1)
      RETURNING category_id
    `;

    const queryParams = [category_name];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new category with ID:', result.rows[0].category_id);
    }

    return result.rows[0].category_id;
};
const updateCategory = async (category_id, category_name) => {
  const query = `
    UPDATE categories
    SET category_name = $2
    WHERE category_id = $1
    RETURNING category_id;
  `;

  const queryParams = [category_id,category_name];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Category not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated category with ID:', category_id);
  }

  return result.rows[0].category_id;
};

export {
    getAllCategories,
    getCategoryById,
    getAllCategoriesByProjectId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} 