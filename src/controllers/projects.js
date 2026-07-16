import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getAllCategoriesByProjectId } from '../models/categories.js';
const showProjectsPage = async (req, res) => {
    const NUMBER_OF_UPCOMING_PROJECTS = 5;
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};  

const showProjectDetailsPage = async (req, res) => {

    const id = req.params.id;

    const project = await getProjectDetails(id);
    const categories = await getAllCategoriesByProjectId(id);

    res.render("project", {
        title: project.title, 
        project,
        categories
    });

};
export { showProjectsPage, showProjectDetailsPage};