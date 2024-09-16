import adminRoutes from "../../constants/adminRoutes";
import { Plus } from "@medusajs/icons";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

const AddNewAvailabilityBtn = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Link
      to={adminRoutes.newAvailability}
      className="transition-fg relative inline-flex w-fit items-center justify-center overflow-hidden rounded-md outline-none disabled:bg-ui-bg-disabled disabled:border-ui-border-base disabled:text-ui-fg-disabled disabled:shadow-buttons-neutral disabled:after:hidden after:transition-fg after:absolute after:inset-0 after:content-[''] shadow-buttons-neutral text-ui-fg-base bg-ui-button-neutral after:button-neutral-gradient hover:bg-ui-button-neutral-hover hover:after:button-neutral-hover-gradient active:bg-ui-button-neutral-pressed active:after:button-neutral-pressed-gradient focus:shadow-buttons-neutral-focus txt-compact-small-plus gap-x-1.5 px-3 py-1.5"
    >
      <Plus /> {children}
    </Link>
  );
};

export default AddNewAvailabilityBtn;
