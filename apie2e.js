const request = require("supertest")("https://restful-booker.herokuapp.com");
const expect = require("chai").expect;
require("dotenv").config({path: "./.env.userCreds"});
const bookingData = require("./bookingData");

describe("API E2E", function () {
    let token;
    it("auth", async function () {
        const response = await request
            .post("/auth")
            .set("Content-Type", "application/json")
            .send({
                username: process.env.booker_Username,
                password: process.env.booker_Password
            });
        expect(response.status).to.equal(200);
        token = response.body.token;
        console.log("Token is created:", token);
    });

    let bookId;
    it("createBooking", async function () {
        const response = await request
            .post("/booking")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .send(bookingData);
        expect(response.status).to.equal(200);
        expect(response.body.booking).to.deep.equal(bookingData);
        bookId = response.body.bookingid;
        console.log("Booking ID is created:", bookId);
    });

    it("getBooking", async function () {
        const response = await request
            .get(`/booking/${bookId}`)
            .set("Accept", "application/json");
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(bookingData);
        console.log("Booking Data for", bookId, "are valid");
    })

    it("deleteBooking", async function () {
        const response = await request
            .delete(`/booking/${bookId}`)
            .set('Cookie', `token=${token}`);
        expect(response.status).to.equal(201);
        console.log("Booking ID for", bookId, "is successfully deleted using token:",token);
    })
});
