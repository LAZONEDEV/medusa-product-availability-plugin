import { AvailabilitiesList } from "../../components/availability/AvailabilitiesList";
import { RouteConfig } from "@medusajs/admin";
import { Calendar } from "@medusajs/icons";
import {
  Button,
  Container,
  Heading,
  Toaster,
  useToggleState,
} from "@medusajs/ui";
import AddNewAvailabilityBtn from "../../components/availability/AddNewButton";
import Modal from "../../components/uikit/Modal";
import AvailabilitiesSetting from "../../components/availability/AvailabilitiesSetting";

const CustomPage = () => {
  const [state, open, toggle] = useToggleState();

  return (
    <>
      <Toaster />

      <div className="flex items-start justify-between mt-2 mb-5">
        <div>
          <Heading>Disponibilités</Heading>

          <p className="max-w-3xl text-gray-500">Gérez vos disponibilités</p>
        </div>
        <div className="flex items-center">
          <Button
            onClick={open}
            className="mr-2 transition-fg relative inline-flex w-fit items-center justify-center overflow-hidden rounded-md outline-none disabled:bg-ui-bg-disabled disabled:border-ui-border-base disabled:text-ui-fg-disabled disabled:shadow-buttons-neutral disabled:after:hidden after:transition-fg after:absolute after:inset-0 after:content-[''] shadow-buttons-neutral text-ui-fg-base bg-ui-button-neutral after:button-neutral-gradient hover:bg-ui-button-neutral-hover hover:after:button-neutral-hover-gradient active:bg-ui-button-neutral-pressed active:after:button-neutral-pressed-gradient focus:shadow-buttons-neutral-focus txt-compact-small-plus gap-x-1.5 px-3 py-1.5"
          >
            Gérez les configurations
          </Button>
          <AddNewAvailabilityBtn>Ajouter</AddNewAvailabilityBtn>
        </div>
      </div>
      <Modal onToggle={toggle} isOpen={state}>
        <Heading>Valeurs par défaut</Heading>
        <AvailabilitiesSetting />
      </Modal>
      <Container>
        <AvailabilitiesList />
      </Container>
    </>
  );
};

export const config: RouteConfig = {
  link: {
    label: "Disponibilités",
    icon: Calendar,
  },
};

export default CustomPage;
