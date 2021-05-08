import * as mongo from "mongodb"
import FriendFacade from '../src/facades/friendFacade';

import chai from "chai";
const expect = chai.expect;

//use these two lines for more streamlined tests of promise operations
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

import bcryptjs from "bcryptjs"
import { InMemoryDbConnector } from "../src/config/dbConnector"
import { ApiError } from "../src/errors/apiError";

let friendCollection: mongo.Collection;
let facade: FriendFacade;

describe("## Verify the Friends Facade ##", () => {

  before(async function () {
      //this.timeout(5000) dette var fordi hyperV gjorde den langsom så testen tog længere end 2 sec
      const client = await InMemoryDbConnector.connect();
      const db = client.db();
      friendCollection = db.collection("friends");
      facade = new FriendFacade(db);
    //Connect to inmemory test database
    //Get the database and initialize the facade
    //Initialize friendCollection, to operate on the database without the facade
  })

  beforeEach(async () => {
    const hashedPW = await bcryptjs.hash("secret", 4)
    await friendCollection.deleteMany({})
    await friendCollection.insertMany([
        {firstName:"Peter", lastName:"Pan", email:"pp@b.dk", password:hashedPW, role:"user"},
        {firstName:"Donald", lastName:"Duck", email:"dd@b.dk", password:hashedPW, role:"user"}
    ])
    //Create a few few testusers for ALL the tests
  })

  describe("Verify the addFriend method", () => {
    it("It should Add the user Jan", async () => {
      const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret" }
      const status = await facade.addFriend(newFriend);
      expect(status).to.be.not.null
      const jan = await friendCollection.findOne({ email: "jan@b.dk" })
      expect(jan.firstName).to.be.equal("Jan")
    })

    it("It should not add a user with a role (validation fails)", async () => {
      const newFriend = { firstName: "Jan", lastName: "Olsen", email: "jan@b.dk", password: "secret", role: "admin" }
      try{
        await facade.addFriend(newFriend);
        expect(false).to.be.true("Should never get to here")
      } catch(err){
        expect(err instanceof ApiError).to.be.true;
      }
    })
  })

  describe("Verify the editFriend method", () => {
    it("It should change lastName to XXXX", async () => {
      const update = { firstName: "Peter", lastName: "XXXX", email: "pp@b.dk", password: "secret"}
      const status = await facade.editFriend("pp@b.dk", update);
      expect(status).to.be.not.null;
      const updated = await friendCollection.findOne({email:"pp@b.dk"});
      expect(updated.lastName).to.be.equal("XXXX");
    })
  })

  describe("Verify the deleteFriend method", () => {
    it("It should remove the user Peter", async () => {
      const deleted = await facade.deleteFriend("pp@b.dk");
      const one = await friendCollection.findOne({email:"pp@b.dk"})
      expect(one).to.be.null;

    })
    it("It should return false, for a user that does not exist", async () => {
      const status = await facade.deleteFriend("nonExistant");
      expect(status).to.be.null;
    })
  })

  describe("Verify the getAllFriends method", () => {
    it("It should get two friends", async () => {
      const friends = await facade.getAllFriends();
      expect(friends).to.be.of.length(2)
    })
  })

  describe("Verify the getFriend method", () => {

    it("It should find Donald Duck", async () => {
      const friend = await facade.getFrind("dd@b.dk");
      expect(friend.firstName).to.be.equal("Donald")
      expect(friend.lastName).to.be.equal("Duck")
    })
    it("It should not find xxx.@.b.dk", async () => {
      const none = await facade.getFrind("xxx.@.b.dk");
      expect(none).to.be.null
    })
  })

  describe("Verify the getVerifiedUser method", () => {
    it("It should correctly validate Peter Pan's credentials", async () => {
      const veriefiedPeter = await facade.getVerifiedUser("pp@b.dk", "secret")
      expect(veriefiedPeter).to.be.not.null;
    })

    it("It should NOT validate Peter Pan's credentials", async () => {
      const nonVerified = await facade.getVerifiedUser("pp@b.dk","incorrectPW");
      expect(nonVerified).to.be.null;
    })

    it("It should NOT validate a non-existing users credentials", async () => {
      const nonVerified = await facade.getVerifiedUser("nonExistant@b.dk","secret");
      expect(nonVerified).to.be.null;
    })
  })

})