import { Button } from "@medusajs/ui";

interface ErrorViewProps {
  onRetry: () => void;
}

const ErrorView = ({ onRetry }: ErrorViewProps) => {
  return (
    <div className="flex items-center flex-col">
      <h4 className="text-2xl">Erreur de chargement.</h4>
      <br />
      <Button onClick={() => onRetry()}>Réessayez</Button>
    </div>
  );
};

export default ErrorView;
