const express = require("express");
const fs = require("fs").promises;

const app = express();
app.use(express.json());

const FILE = "./habits.json";

/* Helper function to read habits */
async function readHabits() {
  const data = await fs.readFile(FILE, "utf-8");
  return JSON.parse(data);
}

/* Helper function to write habits */
async function writeHabits(data) {
  await fs.writeFile(FILE, JSON.stringify(data, null, 2));
}

/* GET all habits */
app.get("/habits", async (req, res) => {
  try {
    const habits = await readHabits();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* POST new habit */
app.post("/habits", async (req, res) => {
  try {
    const habits = await readHabits();

    const newHabit = {
      id: Date.now(),
      title: req.body.title,
      completed: false
    };

    habits.push(newHabit);
    await writeHabits(habits);

    res.status(201).json(newHabit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* PATCH mark habit completed */
app.patch("/habits/:id", async (req, res) => {
  try {
    const habits = await readHabits();
    const id = parseInt(req.params.id);

    const habit = habits.find(h => h.id === id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    habit.completed = true;
    await writeHabits(habits);

    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* DELETE habit */
app.delete("/habits/:id", async (req, res) => {
  try {
    const habits = await readHabits();
    const id = parseInt(req.params.id);

    const updatedHabits = habits.filter(h => h.id !== id);

    await writeHabits(updatedHabits);

    res.json({ message: "Habit deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
