import WhoWeAre from "@/components/about/Whoweare";
import Team from "@/components/about/Team";
import Mission from "@/components/about/Mission";
import CoreValues from "@/components/about/CoreValues";

export default function AboutPage() {
    return (
        <main className="flex flex-col w-full">
            <WhoWeAre />
            <Team />
            <Mission />
            <CoreValues />
        </main>
    );
}
