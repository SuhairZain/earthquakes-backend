import app from "./src/server";
import { initialize as initializeDb } from "./src/database";

const PORT = 1234;

app.listen(PORT, async () => {
  await initializeDb();

  console.log(`Server is listening on port: ${PORT}`);
});
