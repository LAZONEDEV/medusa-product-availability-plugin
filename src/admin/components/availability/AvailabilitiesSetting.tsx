import { Form, Formik } from "formik";
import AvailabilityNotesForm from "./detail-page/AvailabilityNotesForm";
import { useGetAvailabilitySettings } from "../../hooks/availabilities/get-availability-setting";
import useAvailabilitySetting from "../../hooks/availabilities/update-availability-setting";
import { AvailabilityNotes, AvailabilitySettingName } from "../../types/api";

const AvailabilitiesSetting = () => {
  const { data: settingList } = useGetAvailabilitySettings();
  const { handleUpdate, isUpdating } = useAvailabilitySetting(
    AvailabilitySettingName.defaultWithdrawAndDeliveryInfo,
  );

  const withdrawAndDeliverySetting = settingList?.find(
    (setting) =>
      setting.configName ===
      AvailabilitySettingName.defaultWithdrawAndDeliveryInfo,
  )?.value as AvailabilityNotes;

  return (
    <div className="mt-2">
      <Formik
        initialValues={{
          withdrawNote: withdrawAndDeliverySetting?.withdrawNote ?? "",
          deliveryNote: withdrawAndDeliverySetting?.deliveryNote ?? "",
        }}
        onSubmit={handleUpdate}
        enableReinitialize
      >
        <Form>
          <AvailabilityNotesForm canSubmit={true} isLoading={isUpdating} />
        </Form>
      </Formik>
    </div>
  );
};

export default AvailabilitiesSetting;
