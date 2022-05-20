import Sinon from "sinon";
import { expect } from "chai";
import TaskService from "../services/TaskService";
import { allTasks, oneTask } from "./taskMock";

describe("TaskService", () => {
  const taskService = new TaskService();
  describe("getAllTasks", () => {
    before(() => {
      Sinon.stub(taskService.model, "read").resolves(allTasks);
    });
    after(() => {
      Sinon.restore();
    });

    it("should return all tasks", async () => {
      const tasks = await taskService.read();
      expect(tasks).to.deep.equal(allTasks);
    });
  });
  describe("getTaskById", () => {
    before(() => {
      Sinon.stub(taskService.model, "readOne").resolves(oneTask);
    });
    after(() => {
      Sinon.restore();
    });

    it("should return task by id", async () => {
      const task = await taskService.readOne(oneTask._id);
      expect(task).to.deep.equal(oneTask);
    });
  });
  describe("createTask", () => {
    before(() => {
      Sinon.stub(taskService.model, "create").resolves(oneTask);
    });
    after(() => {
      Sinon.restore();
    });

    it("should create task", async () => {
      const task = await taskService.create(oneTask);
      expect(task).to.deep.equal(oneTask);
    });
  });
  describe("updateTask", () => {
    before(() => {
      Sinon.stub(taskService.model, "update").resolves(oneTask);
    });
    after(() => {
      Sinon.restore();
    });

    it("should update task", async () => {
      const task = await taskService.update(oneTask._id, oneTask);
      expect(task).to.deep.equal(oneTask);
    });
  });
  describe("deleteTask", () => {
    before(() => {
      Sinon.stub(taskService.model, "delete").resolves(oneTask);
    });
    after(() => {
      Sinon.restore();
    });

    it("should delete task", async () => {
      const task = await taskService.delete(oneTask._id);
      expect(task).to.deep.equal(oneTask);
    });
  });
});
