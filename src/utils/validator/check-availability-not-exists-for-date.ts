import { Availability } from "@/models/availability";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Between } from "typeorm";
import { getEndOfDay } from "../date/getEndOfDay";
import { getStartOfDay } from "../date/getStartOfDay";
const checkAvailabilityNotExistsForADate = async (date: Date) => {
  try {
    const availabilityRepo = dataSource.getRepository(Availability);
    const startOfDay = getStartOfDay(date);
    const endOfDay = getEndOfDay(date);

    return availabilityRepo.exists({
      where: {
        date: Between(startOfDay, endOfDay),
      },
    });
  } catch (error) {
    throw error;
  }
};

export default checkAvailabilityNotExistsForADate;
