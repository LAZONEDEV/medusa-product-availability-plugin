import { createAvailability } from "./handlers/create-availability";
import { getAvailabilities } from "./handlers/get-availabilities";

export const POST = createAvailability;

export const GET = getAvailabilities;
