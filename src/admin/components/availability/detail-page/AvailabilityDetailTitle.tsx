import { ArrowLeftMini } from "@medusajs/icons";
import { formatAvailabilityDate } from "../../../utils/date";
import { Heading, Button } from "@medusajs/ui";
import { useNavigate } from "react-router-dom";
import { AvailabilityStatus } from "@/admin/types/api";
import AvailabilityStatusBadge from "../utils/AvailabilityStatusBadge";

interface AvailabilityDetailTitleProps {
  date: string | Date;
  status: AvailabilityStatus;
}

const AvailabilityDetailTitle = ({
  date,
  status,
}: AvailabilityDetailTitleProps) => {
  const navigate = useNavigate();
  const formattedDate = formatAvailabilityDate(date);

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

      <div className="flex items-center gap-x-2 justify-between">
        <Heading>Détails de la disponibilité du : {formattedDate}</Heading>

        <AvailabilityStatusBadge status={status} />
      </div>
    </>
  );
};

export default AvailabilityDetailTitle;
