import { Job } from "../models/job.model.js";

//admin job posting
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      position,
      companyId,
      experiance,
    } = req.body;
    const userId = req.id; // logged in user id
    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary ||
      !jobType ||
      !position ||
      !companyId ||
      !experiance
    ) {
      return res.status(404).json({
        message: "Missing required fields",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements,
      location,
      salary: Number(salary),
      jobType,
      position,
      company: companyId,
      experianceLevel: experiance,
      created_by: userId,
    });
    return res.status(200).json({
      message: "Job posted successfully",
      job,
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error posting job",
      success: false,
    });
  }
};
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { requirements: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
        { jobType: { $regex: keyword, $options: "i" } },
        { position: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "No job found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error getting all jobs",
      success: false,
    });
  }
};
//users
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate({
        path: "applications",
      })
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error getting job by id",
      success: false,
    });
  }
};
//admin job created
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id; // logged in user id
    const jobs = await Job.find({ created_by: adminId })
      .populate({
        path: "company",
        sort: { createdAt: -1 },
      })
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "No job found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error getting admin jobs",
      success: false,
    });
  }
};
