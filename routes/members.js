const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const Members = require("../members");

// Get all members
router.get("/", (req, res) => {
  const users = Members.map(({ id, name }) => ({ id: id, name: name }));
  res.json(users);
});

// Get single member
router.get("/:id", (req, res) => {
  const found = Members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    let user;
    Members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        user = member;
      }
    });
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

//Create new member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    age: req.body.age,
  };

  if (!newMember.name || !newMember.age) {
    return res.sendStatus(401).json("please enter email and age");
  }

  Members.push(newMember);
  // res.status(201).json(newMember);
  res.redirect("/");
});

//update
router.patch("/:id", (req, res) => {
  const found = Members.some((member) => member.id == req.params.id);

  if (found) {
    Members.forEach((member, index) => {
      if (member.id == req.params.id) {
        Members.splice(index, 1, {
          ...member,
          ...req.body,
        });
      }
    });
    res.status(200).send(Members);
  } else {
    res.status(400).send({ msg: "That id was not found" });
  }
});

// delete
router.delete("/:id", (req, res) => {
  Members.forEach((member, index) => {
    if (member.id == req.params.id) {
      Members.splice(index, 1);
    }
  });
  const users = Members.map(({ id, name }) => ({ id: id, name: name }));
  res.json(users);
});

module.exports = router;
