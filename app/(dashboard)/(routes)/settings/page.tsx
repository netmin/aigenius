import { Settings } from "lucide-react";
import Heading from "@/components/heading";
import {checkSubscription} from "@/lib/subscription";


const SettingsPage = async () => {
    const isPro = await checkSubscription()

  return (
    <div>
      <Heading
        title="Настройки"
        description="Управление настройками аккаунта"
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
            {isPro ? "У вас PRO план." : "Ваш текуший план бесплатный."}
        </div>
      </div>
    </div>
   );
}

export default SettingsPage;
