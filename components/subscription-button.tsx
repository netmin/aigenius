"use client"

import { useProModal } from "@/hooks/use-pro-modal";
import { useCancelProModal } from "@/hooks/use-cancel-pro-modal";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";

export const SubscriptionButton = ({
  isPro = false
}: {
  isPro: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const proModal = useProModal();
  const cancelProModal = useCancelProModal();

  const onClick = async () => {
    try {
      setLoading(true);
    } catch (error) {
      toast.error("Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  };

  const openProModal = () => {
    isPro ? cancelProModal.onOpen() : proModal.onOpen();
  };

  return (
    <Button onClick={openProModal} variant="premium" disabled={loading} >
      {loading ? (
        <div className="flex items-center space-x-2">
          <span>Обработка...</span>
        </div>
      ) : (
        isPro ? "Отменить подписку" : "Обновить"
      )}
    </Button>
  );
};
