import mongoConnection from "./mongo.js";

const spinServer = async (app) => {
  try {
    mongoConnection(process.env.MONGO_URL);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

export default spinServer;
