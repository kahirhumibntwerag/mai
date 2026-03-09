import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-luxury py-24 md:py-32 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="font-serif text-6xl md:text-8xl font-medium tracking-wide text-accent mb-4">
        404
      </h1>
      <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-wide mb-4">
        Page Not Found
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button render={<Link href="/" />} nativeButton={false} className="uppercase tracking-wider">
        Return Home
      </Button>
    </div>
  );
}
