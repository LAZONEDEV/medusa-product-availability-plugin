import { FocusModal } from "@medusajs/ui";
import { PropsWithChildren } from "react";

interface ModalInterface {
  title?: string;
  onToggle: () => void;
  isOpen: boolean;
}
const Modal = ({
  children,
  title,
  onToggle,
  isOpen,
}: PropsWithChildren<ModalInterface>) => {
  return (
    <FocusModal onOpenChange={onToggle} open={isOpen}>
      <FocusModal.Content className="max-w-xl max-h-max m-auto pt-1 overflow-scroll">
        {title ? <FocusModal.Header>{title}</FocusModal.Header> : null}
        <FocusModal.Body className="overflow-scroll p-4">
          {children}
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
};

export default Modal;
