import { Dialog } from "@headlessui/react";

type ConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
};

export default function ConfirmModal({
    isOpen, 
    onClose, 
    onConfirm, 
    title="Confirm Action", 
    message="Are you Sure?"}: ConfirmProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Center container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm p-6 bg-white shadow-lg rounded-xl">
          
          <Dialog.Title className="text-lg font-semibold text-blue-600">
            {title}
          </Dialog.Title>

          <div className="mt-2 text-sm text-gray-600">
            {message}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-black bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Confirm
            </button>
          </div>

        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
