import { getAllCategories, getCategoryById } from '../models/categories.js';
import { getAllProjectsByCategoryId } from '../models/projects.js';

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};  

const showCategoryDetailsPage = async (req, res) => {

    const id = req.params.id;

    const category = await getCategoryById(id);
    const projects = await getAllProjectsByCategoryId(id);

    res.render("category", {
        title: category.category_name,
        category,
        projects
    });

};

export { showCategoriesPage, showCategoryDetailsPage };