import { ArrowLeftMini } from "@medusajs/icons";
import { toLocaleDate } from "../../../utils/date";
import { Heading, Button } from "@medusajs/ui";
import { useNavigate } from "react-router-dom";

interface AvailabilityDetailTitleProps {
  date: string | Date;
}

const AvailabilityDetailTitle = ({ date }: AvailabilityDetailTitleProps) => {
  const navigate = useNavigate();
  const formattedDate = toLocaleDate(date);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Button
        variant="transparent"
        className="px-0 mb-4 text-gray-500 hover:text-gray-600"
        onClick={goBack}
      >
        <ArrowLeftMini /> Retour
      </Button>

      <Heading className="mb-6">
        Détails de la disponibilité du : {formattedDate}
      </Heading>
    </>
  );
};

export default AvailabilityDetailTitle;
