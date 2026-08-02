import db from './db.js';



const getAllProjects = async () => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            o.name AS organization_name
        FROM projects p
        JOIN organization o
            ON p.organization_id = o.organization_id
        ORDER BY p.project_date;
    `;

    const result = await db.query(query);
    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM projects
        WHERE organization_id = $1
        ORDER BY project_date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {

    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date AS date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM projects p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_date >= CURRENT_DATE
        ORDER BY p.project_date ASC
        LIMIT $1;
    `;

    const result = await db.query(query, [number_of_projects]);

    return result.rows;
};

const getProjectDetails = async (id) => {

    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date AS date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM projects p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

const getAllProjectsByCategoryId = async (id) => {
   const query = `
        SELECT
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.project_date
        FROM project_categories c
        JOIN projects p
            ON c.project_id = p.project_id
        WHERE c.category_id = $1;   
    `;
  const result = await db.query(query, [id]);

  return result.rows;
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO projects (title, description, location, project_date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async (
  title,
  description,
  location,
  project_date,
  organization_id,
  project_id
) => {

  const query = `
    UPDATE projects
    SET
      title = $1,
      description = $2,
      location = $3,
      project_date = $4,
      organization_id = $5
    WHERE project_id = $6
    RETURNING project_id;
  `;

  const queryParams = [
    title,
    description,
    location,
    project_date,
    organization_id,
    project_id
  ];

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Project not found");
  }

  if (process.env.ENABLE_SQL_LOGGING === "true") {
    console.log("Updated project with ID:", project_id);
  }

  return result.rows[0].project_id;
};

const addVolunteer = async (projectId, userId) => {
    const query = `
        INSERT INTO project_users (project_id, user_id)
        VALUES ($1, $2)
        RETURNING project_id;
    `;

    const result = await db.query(query, [projectId, userId]);

    return result.rows[0];
};

const removeVolunteer = async (projectId, userId) => {
    const query = `
        DELETE FROM project_users
        WHERE project_id = $1
        AND user_id = $2;
    `;

    await db.query(query, [projectId, userId]);
};

const getVolunteerProjects = async (userId) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            o.name AS organization_name
        FROM project_users pu
        JOIN projects p
            ON pu.project_id = p.project_id
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE pu.user_id = $1
        ORDER BY p.project_date;
    `;

    const result = await db.query(query, [userId]);

    return result.rows;
};


const isVolunteer = async (projectId, userId) => {
    const query = `
        SELECT *
        FROM project_users
        WHERE project_id = $1
        AND user_id = $2;
    `;

    const result = await db.query(query, [projectId, userId]);

    return result.rows.length > 0;
};
export {
    getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    getAllProjectsByCategoryId,
    createProject,
    updateProject,
    addVolunteer,
  removeVolunteer,
  getVolunteerProjects,

    isVolunteer
};