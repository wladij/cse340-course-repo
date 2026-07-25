import { getAllCategories, getCategoryById, updateCategoryAssignments } from '../models/categories.js';
import { getAllProjectsByCategoryId } from '../models/projects.js';
import { getProjectDetails } from '../models/projects.js';
import { getAllCategoriesByProjectId, createCategory, updateCategory } from '../models/categories.js';
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('category_name')
        .trim()
        .notEmpty()
        .withMessage("Category name is required.")
        .isLength({ min: 3, max: 100 })
        .withMessage("Category name must be between 3 and 100 characters.")
];

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

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getAllCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const showNewCategory = async (req, res) => {
    res.render("new-category", {
        title: "Create New Category"
    });
};
const processNewCategory = async (req, res) => {
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new organization form
        return res.redirect('/new-category');
    }

    const {category_name} = req.body;
        

    const category_Id = await createCategory(category_name);
    req.flash('success', 'Category added successfully!');
    res.redirect(`/category/${category_Id}`);
};

const showEditCategory = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId);

    const title = 'Edit Category';
    res.render('edit-category', { title, categoryDetails });
};
const processEditCategory = async (req, res) => {
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit organization form
        return res.redirect('/edit-category/' + req.params.id);
    }

    const categoryId = req.params.id;
    const { category_name} = req.body;

    await updateCategory(categoryId, category_name);
    
    // Set a success flash message
    req.flash('success', 'Category updated successfully!');

    res.redirect(`/category/${categoryId}`);
};

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategory,
    processNewCategory,
    showEditCategory,
    processEditCategory,
    categoryValidation
};