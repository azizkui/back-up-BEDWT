const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");

const {
  User
} = require("../models");

exports.register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      address
    } = req.body;

    const schema = joi.object({
      fullName: joi.string().min(3).required(),
      email: joi.string().email().min(10).required(),
      password: joi.string().min(8).required(),
      phone: joi.string(),
      address: joi.string(),
    });

    const {
      error
    } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(400).send({
        error: {
          message: "email already existed",
        },
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bycript.hash(password, saltRounds);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    const token = jwt.sign({
        id: user.id,
      },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).send({
      message: "You registration is successful ",
      data: {
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};

exports.login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const schema = joi.object({
      email: joi.string().email().min(11).required(),
      password: joi.string().min(8).required(),
    });

    const {
      error
    } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).send({
        error: {
          message: "Email or password is invalid",
        },
      });
    }

    const validPass = await bycript.compare(password, user.password);
    if (!validPass)
      return res.status(400).send({
        error: {
          message: "Email or password is invalid",
        },
      });

    const token = jwt.sign({
        id: user.id,
      },
      process.env.JWT_SECRET_KEY
    );

    res.status(200).send({
      message: "login success",
      data: {
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.log(err);
    response.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};