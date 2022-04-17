const projectService = require("../services/project.service");

const discordWebhookService = require("../services/discordWebhook.service");

const serverErrorResponse = {
    success: false,
    error: {
        message: "Server error occurred, please try again!",
    },
};

module.exports = {
    getAll: async (req, res) => {
        try {
            await projectService.getAll().then((projects) => {
                const projectsFormatted = [];
                for (let project of projects) {
                    project = projectService.hideSensitiveInformations(project);
                    projectsFormatted.push(project);
                }
                return res.status(200).json({
                    success: true,
                    payload: projectsFormatted,
                });
            });
        } catch (error) {
            console.log("projectController.getAll Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getById: async (req, res) => {
        try {
            const projectId = req.params.postId;
            if (!(await projectService.isProjectExist(projectId))) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Project with that id was not found!",
                    },
                });
            }

            await projectService.getById(projectId).then((project) => {
                return res.status(200).json({
                    success: true,
                    payload: projectService.hideSensitiveInformations(project),
                });
            });
        } catch (error) {
            console.log("projectController.getById Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    getBySlug: async (req, res) => {
        try {
            const slug = req.params.slug;

            try {
                await projectService.getBySlug(slug).then((project) => {
                    return res.status(200).json({
                        success: true,
                        payload:
                            projectService.hideSensitiveInformations(project),
                    });
                });
            } catch (error) {
                return res.status(404).json({
                    success: false,
                    error: {
                        message: "Project with that slug was not found!",
                    },
                });
            }
        } catch (error) {
            console.log("projectController.getBySlug Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },
};
