import { getAvailabilityNotes } from "./handlers/get-notes-availability";
import { updateAvailabilityNote } from "./handlers/update-notes-availability";

export const GET = getAvailabilityNotes;
export const PATCH = updateAvailabilityNote;
