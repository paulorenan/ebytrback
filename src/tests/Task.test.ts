import Sinon from "sinon";
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../..";
import TaskModel from "../models/TaskModel";
import { allTasks, oneTask } from "./taskMock";

chai.use(chaiHttp);

const { expect } = chai;

describe("Tasks routes", () => {
  const app = server.getApp();
  const taskModel = new TaskModel();
  describe("GET /tasks", () => {
    before(() => {
      Sinon.stub(taskModel, "read").resolves(allTasks);
    });
    after(() => {
      Sinon.restore();
    });

    it("should return all tasks", async () => {
      const res = await chai.request(app).get("/tasks");
      expect(res.status).to.equal(200);
      allTasks.forEach((task) => {
        expect(task).to.have.property("_id");
        expect(task).to.have.property("title");
        expect(task).to.have.property("description");
        expect(task).to.have.property("status");
      });
    });
  });
  describe("GET /tasks/:id", () => {
    before(() => {
      Sinon.stub(taskModel, "readOne").resolves(oneTask);
    });
    after(() => {
      Sinon.restore();
    });

    it("should return task by id", async () => {
      const res = await chai.request(app).get(`/tasks/${oneTask._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("_id");
      expect(res.body).to.have.property("title");
      expect(res.body).to.have.property("description");
      expect(res.body).to.have.property("status");
    });
  });
});