const express = require("express");

const router = express.Router();

const {
  showCountry,
  showCountryDetail,
  createCountry,
  updateCountry,
} = require("../controller/country");

const {
  showTrip,
  showTripDetail,
  createTrip,
  updateTrip,
  deleteTrip,
} = require("../controller/trip");

const {
  showTransaction,
  showTransactionDetail,
  createTransaction,
  updateTransaction,
} = require("../controller/transaction");

const { showUser, deleteUser } = require("../controller/");

router.get("/country", showCountry);
router.get("/country/:id", showCountryDetail);
router.post("/country", createCountry);
router.patch("/country/:id", updateCountry);

router.get("/trip", showTrip);
router.get("/trip/:id", showTripDetail);
router.post("/trip", createTrip);
router.patch("/trip/:id", updateTrip);
router.delete("/trip/:id", deleteTrip);

router.get("/transaction", showTransaction);
router.get("/transaction/:id", showTransactionDetail);
router.post("/transaction", createTransaction);
router.patch("/transaction/:id", updateTransaction);

router.get("/user", showUser);
router.delete("/user/:id", deleteUser);

router.post("/register", register);
router.post("/login", login);

module.exports = router;
