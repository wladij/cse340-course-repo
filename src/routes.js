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
import {
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    volunteerForProject,
    removeVolunteerFromProject
} from './controllers/projects.js';
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
    showDashboard,
    requireRole,
    showUsersPage
} from './controllers/users.js';



const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization', requireRole('admin') ,organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
router.get('/edit-project/:id', requireRole('admin'), showEditProject);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProject);
router.get("/new-category", requireRole('admin'), showNewCategory);
router.post("/new-category", requireRole('admin'), categoryValidation, processNewCategory);
router.get("/edit-category/:id", requireRole('admin'), showEditCategory);
router.post("/edit-category/:id", requireRole('admin'), categoryValidation, processEditCategory);
router.get("/users", requireRole('admin', '/dashboard'), showUsersPage);
router.post('/project/:id/volunteer', requireLogin, volunteerForProject);
router.post('/project/:id/unvolunteer', requireLogin, removeVolunteerFromProject);
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