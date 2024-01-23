import { Table, StatusBadge } from "@medusajs/ui";
import AvailabilityProductsList from "./AvailabilityProductsList";
import AvailabilitiesSkeleton from "./AvailabilitiesSkeleton";
import { useGetAvailabilities } from "../../hooks/availabilities";
import { AvailabilityStatus } from "../../types/api";
import { Pencil } from "@medusajs/icons";
import ErrorView from "./ErrorView";
import { Link } from "react-router-dom";
import EmptyList from "./EmptyList";

export function AvailabilitiesList() {
  const {
    isLoading,
    availabilities,
    canNextPage,
    canPreviousPage,
    currentPage,
    error,
    nextPage,
    pageCount,
    pageSize,
    previousPage,
    refetch,
  } = useGetAvailabilities();

  if (isLoading) {
    return <AvailabilitiesSkeleton />;
  }

  if (error) {
    return <ErrorView onRetry={refetch} />;
  }

  if (availabilities.length === 0) {
    return <EmptyList />;
  }

  return (
    <Table>
      <Table.Header className="border-t-0">
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Produits</Table.HeaderCell>
          <Table.HeaderCell>État</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {availabilities.map((order) => {
          const formattedDate = new Date(order.date).toLocaleDateString(
            undefined,
            { month: "long", day: "2-digit", year: "numeric" },
          );

          return (
            <Table.Row
              key={order.id}
              className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap"
            >
              <Table.Cell>{formattedDate}</Table.Cell>

              <Table.Cell>
                <AvailabilityProductsList
                  productAvailabilities={order.availabilityProducts}
                />
              </Table.Cell>

              <Table.Cell>
                <StatusBadge
                  color={
                    order.status === AvailabilityStatus.Active ? "green" : "red"
                  }
                >
                  {order.status}
                </StatusBadge>
              </Table.Cell>

              <Table.Cell>
                <Link to={order.id}>
                  <Pencil />
                </Link>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>

      <Table.Pagination
        count={availabilities.length}
        pageSize={pageSize}
        pageIndex={currentPage}
        pageCount={pageCount}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </Table>
  );
}
