const dbHelper = require("../database-helper/database-helper");
const AbstractTemplate = require("./abstract_template");

describe("insert", () => {

    beforeAll(async () => {
        await dbHelper.start(async function(err, client) {
            if (err) return console.error("MongoClient connection error: ", err);
            AbstractTemplate.Db = dbHelper.getDb();
        });
    });

    afterAll(async () => {
        await dbHelper.close();
    });

    it("should insert a doc into collection", async () => {
    const mockUser = { _id: "some-user-id", name: "John" };
    const insertResponse = await AbstractTemplate.persistOne(mockUser);
    console.log(insertResponse);
    const insertedUser = await users.findOne({ _id: "some-user-id" });
    expect(insertedUser).toEqual(mockUser);
  });
});


