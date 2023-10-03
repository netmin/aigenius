// components/CancelProModal.tsx
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCancelProModal } from "@/hooks/use-cancel-pro-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

export const CancelProModal = () => {
    const cancelProModal = useCancelProModal();
    const [loading, setLoading] = useState(false)

    const onCancel = async () => {
        try {
            setLoading(true);
            await axios.get("/api/delete-subscription")
            window.location.reload()
        } catch (error) {
            console.error("Ошибка при отмене подписки:", error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <Dialog open={cancelProModal.isOpen} onOpenChange={cancelProModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Отмена подписки</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Ваша подписка будет аннулирована. Вы уверены?
                </DialogDescription>
                <DialogFooter>
                    <Button variant="premium" onClick={onCancel} disabled={loading} >
                        {loading ? "Обработка..." : "Отменить подписку"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
