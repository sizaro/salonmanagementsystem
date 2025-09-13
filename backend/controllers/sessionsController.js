import { saveSalonSession, updateSalonSession, fetchTodaySalonSession } from '../models/sessionsModel.js';

export const openSalonSession = async (req, res) => {
  try {
    const {closeTime, status } = req.body;

    console.log("Opening salon session:",closeTime, status);

    await saveSalonSession(status);

    res.status(201).json({
      message: "Salon session opened successfully",
    });
  } catch (error) {
    console.error("Error opening salon session:", error);
    res.status(500).json({ message: "Failed to open salon session" });
  }
};


export const closeSalonSession = async (req, res) => {
  try {
    const { status } = req.body;

    console.log("Closing salon session:", status);

    await updateSalonSession(status);

    res.status(200).json({
      message: "Salon session closed successfully",
    });
  } catch (error) {
    console.error("Error closing salon session:", error);
    res.status(500).json({ message: "Failed to close salon session" });
  }
};


export const getSalonSession = async (req, res) => {
  try {
    const session = await fetchTodaySalonSession(); // call model
    if (!session) {
      return res.json({ status: "closed" }); // default if no open session today
    }

    console.log("this is the salon status in the controller", session)
    res.json(session)
  } catch (error) {
    console.error("Error fetching salon status:", error);
    res.status(500).json({ message: "Failed to fetch salon status" });
  }
};