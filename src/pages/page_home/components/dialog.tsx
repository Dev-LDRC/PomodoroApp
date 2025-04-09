import { useState } from "react";
import { DialogSettings } from "../../../components/dialog_settings";
import Button from "../../../components/buttons";
import { GrUserSettings } from "react-icons/gr";

// interface DialogUserSettingsProps {
//    current_m: number 
//    current_s: number 
//    set_m: React.Dispatch<React.SetStateAction<number>>;
//    set_s: React.Dispatch<React.SetStateAction<number>>;
// }

// { current_m, current_s, set_m, set_s }: DialogUserSettingsProps
export function DialogUserSettings() {
   const [isOpen, setIsOpen] = useState(false);
   // const [timerValue, setTimerValue] = useState({ minutes: 0, seconds: 0 });

   const openDialog = () => setIsOpen(true);
   const closeDialog = () => setIsOpen(false);

   const handleSave = () => {
      //
   };


   return (
      <div>

         <Button
            type="button"
            onClick={openDialog}
         >
            <GrUserSettings size={35} />
         </Button>

         <DialogSettings
            isOpen={isOpen}
            onClose={closeDialog}
            onSave={handleSave}
         />

      </div>
   );
};