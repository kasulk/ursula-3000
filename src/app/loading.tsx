import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <Spinner
      size="lg"
      color="danger"
      label="Loading..."
      classNames={{
        base: "-mb-24 -mt-48 flex h-screen items-center justify-center",
      }}
    />
  );
}
