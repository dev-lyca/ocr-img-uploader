import { Details } from "@/components/details";
import { Upload } from "@/components/upload";

export default function Home() {
  return (
    <section>
      <div className="flex flex-col lg:flex-row">
        <Upload />
        <div className="lg:w-px lg:self-stretch lg:mx-4 w-full h-px bg-zinc-800 my-4 lg:my-0" />
        <Details />
      </div>
    </section>
  );
}
