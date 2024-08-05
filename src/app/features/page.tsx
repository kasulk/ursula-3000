import { GlowText, BackButton } from "@/components/ui";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-12">
      <h2 className="mb-12 text-xl">This is going to be the Features-Page</h2>
      <p className="text-lg">
        <GlowText variant="orange pink">Coming soon!</GlowText>
      </p>
      <BackButton className="mt-12 rounded-xl bg-gradient-to-tr from-pink-500 to-orange-500 p-4 py-2 text-sm font-bold uppercase text-white shadow-lg">
        Nice!
      </BackButton>
    </div>
  );
}
