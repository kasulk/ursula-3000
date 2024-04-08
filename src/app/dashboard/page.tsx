import { GlowText, BackButton } from "@/components/ui";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-12">
      <h2 className="mb-12 text-xl">This is the Dashboard-Page</h2>
      <p className="text-lg">
        <GlowText variant="orange pink">Coming soon!</GlowText>
      </p>
      <BackButton className="mt-12 text-xl">Go Back</BackButton>
    </div>
  );
}
