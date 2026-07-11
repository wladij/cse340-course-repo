-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');
--Creation table Project



CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_projects_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

-- Insert data
INSERT INTO projects (organization_id, title, description, location, project_date)
VALUES
-- Organization 1
(1, 'Community Blood Drive', 'Organize a blood donation event for local hospitals.', 'Guayaquil', '2026-07-15'),
(1, 'First Aid Workshop', 'Teach basic first aid skills to the community.', 'Durán', '2026-07-22'),
(1, 'Emergency Supply Distribution', 'Distribute emergency kits to families in need.', 'Samborondón', '2026-08-05'),
(1, 'Health Awareness Campaign', 'Promote healthy habits through community events.', 'Milagro', '2026-08-12'),
(1, 'Senior Care Visits', 'Visit elderly people and provide companionship.', 'Guayaquil', '2026-08-20'),

-- Organization 2
(2, 'Tree Planting Day', 'Plant native trees in public parks.', 'Guayaquil', '2026-07-18'),
(2, 'Beach Cleanup', 'Remove trash from local beaches.', 'Playas', '2026-07-25'),
(2, 'Recycling Workshop', 'Teach families how to recycle effectively.', 'Durán', '2026-08-02'),
(2, 'Community Garden', 'Create a shared vegetable garden.', 'Samborondón', '2026-08-10'),
(2, 'River Cleanup', 'Collect waste along the riverbanks.', 'Babahoyo', '2026-08-18'),

-- Organization 3
(3, 'Food Collection Drive', 'Collect non-perishable food donations.', 'Guayaquil', '2026-07-20'),
(3, 'Community Kitchen', 'Prepare meals for homeless families.', 'Durán', '2026-07-28'),
(3, 'School Lunch Program', 'Provide lunches for students in need.', 'Milagro', '2026-08-06'),
(3, 'Food Distribution Event', 'Deliver food baskets to low-income families.', 'Samborondón', '2026-08-14'),
(3, 'Nutrition Education', 'Teach healthy eating habits to parents.', 'Guayaquil', '2026-08-22');


-- create table categories and table project_categories

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(150) NOT NULL
);

CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES projects(project_id),

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
);

-- insert data in table categories

INSERT INTO categories (category_name)
VALUES
('Health'),
('Environment'),
('Food Assistance'),
('Education');

-- insert relation between tables projects and categories

INSERT INTO project_categories (project_id, category_id)
VALUES
-- Health
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),

-- Environment
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),

-- Food Assistance
(11, 3),
(12, 3),
(13, 3),
(14, 3),

-- Education
(15, 4);

INSERT INTO project_categories (project_id, category_id)
VALUES
(2, 4),   -- First Aid Workshop too is Education
(4, 4),   -- Health Awareness Campaign too is Education
(8, 4),   -- Recycling Workshop too is Education
(13, 1),  -- School Lunch Program too is Health
(15, 3);  -- Nutrition Education too is Food Assistance