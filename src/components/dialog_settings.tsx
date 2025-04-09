import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";

interface DialogSettingsProps {
   isOpen: boolean;
   onClose: () => void;
   onSave: (minutes: number, seconds: number) => void;
   initialMinutes?: number;
   initialSeconds?: number;
}

export function DialogSettings({
   isOpen,
   onClose,
   onSave,
   initialMinutes = 0,
   initialSeconds = 0
}: DialogSettingsProps) {
   
   const [minutes, setMinutes] = useState(initialMinutes);
   const [seconds, setSeconds] = useState(initialSeconds);

   const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      setMinutes(isNaN(value) ? 0 : Math.max(0, Math.min(59, value)));
   };

   const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      setSeconds(isNaN(value) ? 0 : Math.max(0, Math.min(59, value)));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(minutes, seconds);
      onClose();
   };

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
         {/* Backdrop */}
         <div
            className="fixed inset-0 bg-black/25 backdrop-blur-sm"
            onClick={onClose}
         />

         {/* Dialog */}
         <div className="relative bg-app_primary rounded-lg shadow-xl w-full max-w-sm mx-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col">
               {/* Header */}
               <div className="flex items-start justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-bold text-app_contrast">
                     Definir Tempo
                  </h3>
                  <button
                     type="button"
                     className="cursor-pointer ml-auto flex h-8 w-8 items-center justify-center rounded-md text-app_contrast hover:text-app_background"
                     onClick={onClose}
                  >

                     <span className="sr-only">Fechar</span>
                     <IoClose className='' size={30} />

                  </button>
               </div>

               {/* Body */}
               <form onSubmit={handleSubmit}>
                  <div className="p-4 space-y-4">
                     <div className="flex gap-4">
                        {/* Minutos */}
                        <div className="flex-1">
                           <label htmlFor="minutes" className="block text-sm font-bold text-app_contrast mb-1">
                              Minutos
                           </label>
                           <input
                              type="number"
                              id="minutes"
                              min="0"
                              max="59"
                              value={minutes}
                              onChange={handleMinutesChange}
                              className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full rounded-md p-3 border-4 border-app_contrast outline-0 focus:border-white"
                           />
                        </div>

                        {/* Segundos */}
                        <div className="flex-1">
                           <label htmlFor="seconds" className="block text-sm font-bold text-app_contrast mb-1">
                              Segundos
                           </label>
                           <input
                              type="number"
                              id="seconds"
                              min="0"
                              max="59"
                              value={seconds}
                              onChange={handleSecondsChange}
                              className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full rounded-md p-3 border-4 border-app_contrast outline-0 focus:border-white"
                           />
                        </div>
                     </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-end gap-3 p-4 border-t border-slate-200 dark:border-slate-700">
                     <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-app_primary bg-app_contrast rounded-md cursor-pointer"
                        onClick={onClose}
                     >
                        Cancelar
                     </button>
                     <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-app_contrast border-4 border-app_contrast bg-app_background rounded-md cursor-pointer"
                     >
                        Salvar
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};