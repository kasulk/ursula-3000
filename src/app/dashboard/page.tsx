import Link from "next/link";
import { GlowText } from "@/components/ui";
import { Button } from "@nextui-org/react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-12">
      <h2 className="mb-12 text-xl">This is going to be the Dashboard-Page</h2>
      <p className="text-lg">
        <GlowText variant="orange pink">Coming soon!</GlowText>
      </p>
      <Link href="/" className="mt-12">
        <Button
          radius="md"
          className="bg-gradient-to-tr from-pink-500 to-orange-500 font-bold uppercase text-white shadow-lg"
        >
          Awesome!
        </Button>
      </Link>
    </div>
  );
}
