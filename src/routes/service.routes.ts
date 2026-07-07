import { authenticate } from "../middleware/authenticate";

/*
app.post("/services", authenticate, async (req, res) => {
  const userId = (req as any).user.id;

  await db.insertInto("service").values({
    mentor_id: userId,
    title: "React Mentorship",
    type: "paid",
    description: "...",
    duration: 60,
    price: 20,
  });

  res.json({ message: "Service created" });
});
*/