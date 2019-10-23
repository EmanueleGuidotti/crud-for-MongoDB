const dbHelper = require("../database-helper/database-helper");
const AbstractTemplate = require("./abstract_template");

let Db = null;
beforeAll(async () => {
  await dbHelper.start(async function(err, client) {
    if (err) return console.error("MongoClient connection error: ", err);
    Db = dbHelper.getDb();
    console.log(Db);
  });
});

afterAll(async () => {
  await dbHelper.close();
});

describe("insert", () => {
  it("should insert a doc into collection", async () => {
    const mockUser = { _id: "some-user-id", name: "John" };
    const insertResponse = await AbstractTemplate.persistOne(mockUser);
    console.log(insertResponse);
    const insertedUser = await users.findOne({ _id: "some-user-id" });
    expect(insertedUser).toEqual(mockUser);
  });
});
