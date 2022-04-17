const Post = require("../models/post.model");

const userService = require("./user.service");
const commentService = require("./comment.service");

const Project = require("../models/project.model");

const self = (module.exports = {
    format: (project) => {
        const commentsFormated = [];
        for (let comment of project.comments) {
            comment = commentService.format(comment);
            commentsFormated.push(comment);
        }
        return {
            _id: project._id,
            title: project.title,
            slug: project.slug,
            author: userService.format(project.author),
            url: project.url,
            featuredImage: project.featuredImage,
            images: project.images,
            excerpt: project.excerpt,
            description: project.description,
            commentsEnabled: project.commentsEnabled,
            comments: commentsFormated,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
        };
    },

    hideSensitiveInformations: (project) => {
        const commentsFormated = [];
        for (let comment of project.comments) {
            comment = commentService.hideSensitiveInformations(comment);
            commentsFormated.push(comment);
        }
        return {
            _id: project._id,
            title: project.title,
            slug: project.slug,
            author: userService.hideSensitiveInformations(project.author),
            url: project.url,
            featuredImage: project.featuredImage,
            images: project.images,
            excerpt: project.excerpt,
            description: project.description,
            commentsEnabled: project.commentsEnabled,
            comments: commentsFormated,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
        };
    },

    getAll: async () => {
        return new Promise(async (resolve, reject) => {
            await Project.find()
                .then(async (projects) => {
                    for (let project of projects) {
                        project.author = await userService.getById(
                            project.author
                        );
                        project.comments =
                            await commentService.getCommentsOfProject(
                                project._id
                            );
                    }
                    resolve(projects);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getById: async (projectId) => {
        return new Promise(async (resolve, reject) => {
            await Project.findById(projectId)
                .then(async (project) => {
                    project.author = await userService.getById(project.author);
                    project.comments =
                        await commentService.getCommentsOfProject(project._id);
                    resolve(project);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    getBySlug: async (slug) => {
        return new Promise(async (resolve, reject) => {
            await Project.find({ slug })
                .then(async ([project]) => {
                    project.author = await userService.getById(project.author);
                    project.comments =
                        await commentService.getCommentsOfProject(project._id);
                    resolve(project);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    isProjectExist: async (projectId) => {
        try {
            if (!(await self.getById(projectId))) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    },

    create: async ({
        title,
        slug,
        authorId,
        featuredImage,
        images,
        url,
        excerpt,
        description,
    }) => {
        return new Promise(async (resolve, reject) => {
            const commentsEnabled = true;
            const comments = [];

            if (!images) {
                images = [];
            }

            const newProject = new Project({
                title,
                slug,
                author: authorId,
                featuredImage,
                images,
                url,
                excerpt,
                description,
                commentsEnabled,
                comments,
            });

            await newProject
                .save()
                .then(async (createdProject) => {
                    const project = await self.getById(createdProject._id);
                    resolve(project);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    update: async (
        projectId,
        {
            title,
            slug,
            featuredImage,
            images,
            url,
            excerpt,
            description,
            commentsEnabled,
        }
    ) => {
        return new Promise(async (resolve, reject) => {
            const project = await self.getById(projectId);

            title = title || project.title;
            slug = slug || project.slug;
            featuredImage = featuredImage || project.featuredImage;
            images = images || project.images;
            url = url || project.url;
            excerpt = excerpt || project.excerpt;
            description = description || project.description;
            if (commentsEnabled == null || commentsEnabled == undefined)
                commentsEnabled = project.commentsEnabled;

            await Project.findByIdAndUpdate(projectId, {
                title,
                slug,
                featuredImage,
                images,
                url,
                excerpt,
                description,
                commentsEnabled,
            })
                .then(async () => {
                    const updeatedProject = await self.getById(projectId);
                    resolve(updeatedProject);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    delete: async (projectId) => {
        return new Promise(async (resolve, reject) => {
            await Project.findByIdAndDelete(projectId)
                .then(async (deletedProject) => {
                    deletedProject.author = await userService.getById(
                        deletedProject.author
                    );
                    deletedProject.comments =
                        await commentService.getCommentsOfProject(
                            deletedProject._id
                        );
                    resolve(deletedProject);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
});
