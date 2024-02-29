import { WidgetConfig, OrderDetailsWidgetProps } from "@medusajs/admin";
import { Container, Heading } from "@medusajs/ui";
import { EyeMini } from "@medusajs/icons";
import { Link } from "react-router-dom";

import { toLocaleDate } from "../../utils/date";
import adminRoutes from "../../constants/adminRoutes";

const AvailabilityDetailWidget = ({ order }: OrderDetailsWidgetProps) => {
  const formattedDate = toLocaleDate(order.availability.date);
  const detailPageURL = `${adminRoutes.availabilities}/${order.availability.id}`;

  return (
    <Container>
      <Heading>Information de la disponibilité</Heading>

      <div className="flex mt-6 text-sm justify-between">
        <dl className="flex">
          <dt>Date de disponibilité : </dt>
          <dd className="text-gray-500">&nbsp;{formattedDate}</dd>
        </dl>

        <Link to={detailPageURL} className="flex hover:underline text-gray-600">
          <EyeMini /> Voir
        </Link>
      </div>
    </Container>
  );
};

export const config: WidgetConfig = {
  zone: "order.details.after",
};

export default AvailabilityDetailWidget;
