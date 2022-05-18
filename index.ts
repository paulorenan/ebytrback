import TaskController from "./src/controllers/TaskController";
import Task from "./src/interfaces/Tasks";
import CustomRouter from "./src/routes/Router";
import App from "./src/app";

const server = new App();

const taskController = new TaskController();

const taskRouter = new CustomRouter<Task>();
taskRouter.addRoute(taskController);

server.addRouter(taskRouter.router);

server.startServer();