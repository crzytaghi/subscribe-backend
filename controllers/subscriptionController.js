import pool from "../db.js";

const getSubscriptions = async (req, res) => {
  try {
    // We now have access to the id of the logged in user from the authorize middleware
    const results = await pool.query("SELECT * FROM subscriptions");
    // console.log("results: ", results.rows);
    res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
  }
};

const createSubscription = async (req, res) => {
  try {
    const { name, transaction_date, amount } = req.body;
    const user_id = req.user;
    console.log(user_id);

    const results = await pool.query(
      "INSERT INTO subscriptions (name, transaction_date, amount, user_id) values ($1, $2, $3, $4)",
      [name, transaction_date, amount, user_id]
    );
    res.status(200).send("Subscription Added");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const results = await pool.query(
      "SELECT * FROM subscriptions WHERE id = $1",
      [id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateSubscription = async (req, res) => {
  const { name, date, amount } = req.body;
  const { id } = req.params;

  try {
    const results = await pool.query(
      "UPDATE subscriptions SET name = $1, date = $2, amount = $3 WHERE id = $4",
      [name, date, amount, id]
    );
    res.status(200).send(`${name} subscription updated successfully`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const results = await pool.query(
      "DELETE FROM subscriptions WHERE id = $1",
      [id]
    );
    res.status(200).send(`Subscription ${id} deleted successfully`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export {
  getSubscription,
  createSubscription,
  getSubscriptions,
  updateSubscription,
  deleteSubscription,
};
