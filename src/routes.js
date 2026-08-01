import express from 'express';
import { showHomePage } from './controllers/index.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showProjectDetailsPage, showProjectsPage, showEditProject, processEditProject } from './controllers/projects.js';
import { showNewOrganizationForm } from './models/organizations.js';
import {
    processNewOrganizationForm,
    organizationValidation,
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js'; 
import { showNewProjectForm, processNewProjectForm, projectValidation } from './controllers/projects.js';
import {
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategory,
    processNewCategory,
    showEditCategory,
    processEditCategory,
    categoryValidation
} from './controllers/categories.js';
import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard
} from './controllers/users.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
router.get('/edit-project/:id', showEditProject);
router.post('/edit-project/:id', projectValidation, processEditProject);
router.get("/new-category", showNewCategory);
router.post("/new-category", categoryValidation, processNewCategory);
router.get("/edit-category/:id", showEditCategory);
router.post("/edit-category/:id", categoryValidation, processEditCategory);
// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);
// error-handling routes
router.get('/test-error', testErrorPage);

export default router;