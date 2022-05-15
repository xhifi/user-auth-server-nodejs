const createJob = async (req, res) => {
  res.status(200).send("Job Created");
};

const deleteJob = async (req, res) => {
  res.status(200).send("Job Deleted");
};
const getAllJobs = async (req, res) => {
  res.status(200).send("All Jobs Retreived");
};
const updateJob = async (req, res) => {
  res.status(200).send("Job Updated");
};
const showStats = async (req, res) => {
  res.status(200).send("Showed Stats");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
