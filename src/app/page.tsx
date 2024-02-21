import { GlowText } from "@/components";

console.log("render Home");

export default function Home() {
  return (
    <section id="welcome">
      <div className="flex flex-col items-center justify-center gap-12">
        <p className="text-5xl font-bold">
          Meet <GlowText variant="orange pink">Ursula</GlowText>!
        </p>
        <h3 className="text-3xl font-bold">
          Find potentially{" "}
          <GlowText variant="secondary primary">cheap stocks</GlowText> fast and
          easy.
        </h3>
      </div>
    </section>
  );
}
