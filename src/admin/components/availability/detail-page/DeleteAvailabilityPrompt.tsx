import useAvailabilityDeletion from "../../../hooks/availabilities/delete-availability";
import { Trash } from "@medusajs/icons";
import { Button, Prompt } from "@medusajs/ui";
import { useNavigate } from "react-router-dom";
import adminRoutes from "../../../constants/adminRoutes";

interface Props {
  availabilityId: string;
}

const DeleteAvailabilityPrompt = ({ availabilityId }: Props) => {
  const navigate = useNavigate();

  const { onDelete, isDeleting } = useAvailabilityDeletion(
    availabilityId,
    () => {
      navigate(adminRoutes.availabilities);
    },
  );

  return (
    <Prompt>
      <Prompt.Trigger asChild>
        <Button variant="danger" className="my-4">
          <Trash /> Supprimer
        </Button>
      </Prompt.Trigger>

      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Suppression de disponibilité</Prompt.Title>
          <Prompt.Description>
            En êtes-vous sûr ? Cela ne peut pas être annulé.
          </Prompt.Description>
        </Prompt.Header>

        <Prompt.Footer>
          <Prompt.Cancel>Annuler</Prompt.Cancel>

          <Prompt.Action disabled={isDeleting} onClick={() => onDelete()}>
            Supprimer
          </Prompt.Action>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
};

export default DeleteAvailabilityPrompt;
