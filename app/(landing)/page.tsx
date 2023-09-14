import {LandingNavbar} from "@/components/landing-navbar";
import {LandingHero} from "@/components/landing-her";
import {LandingContent} from "@/components/landing-content";

const LangingPage = () => {
    return (
        <div className="h-full">
            <LandingNavbar />
            <LandingHero />
            <LandingContent />
        </div>
    )
}

export default LangingPage