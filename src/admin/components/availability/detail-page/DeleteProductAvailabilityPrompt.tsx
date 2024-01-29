import { Prompt } from "@medusajs/ui";

interface DeleteProductAvailabilityPromptProps {
  onRemove: () => void;
  onCancel: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  productTitle: string;
}

const DeleteProductAvailabilityPrompt = ({
  open,
  onCancel,
  onRemove,
  productTitle,
  onOpenChange,
}: DeleteProductAvailabilityPromptProps) => {
  return (
    <Prompt open={open} onOpenChange={onOpenChange}>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Suppression de disponibilité de produit</Prompt.Title>

          <Prompt.Description>
            En êtes-vous sûre de vouloir supprimer la disponibilité du produit
            &nbsp;
            <strong>{productTitle}</strong>&nbsp;?
            <br />
            Cette action est irréversible.
          </Prompt.Description>
        </Prompt.Header>

        <Prompt.Footer>
          <Prompt.Cancel onClick={onCancel}>Annuler</Prompt.Cancel>
          <Prompt.Action onClick={onRemove}>Supprimer</Prompt.Action>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
};

export default DeleteProductAvailabilityPrompt;
