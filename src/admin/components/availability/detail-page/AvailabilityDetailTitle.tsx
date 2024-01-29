import { toLocaleDate } from "../../../utils/date";
import { Heading } from "@medusajs/ui";

interface AvailabilityDetailTitleProps {
  date: string | Date;
}

const AvailabilityDetailTitle = ({ date }: AvailabilityDetailTitleProps) => {
  const formattedDate = toLocaleDate(date);

  return (
    <Heading className="mb-10">
      Détails de la disponibilité du : {formattedDate}
    </Heading>
  );
};

export default AvailabilityDetailTitle;
