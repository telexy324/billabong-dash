import MDEditor from "@/components/MDEditor"

export default function MD() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="mb-6 text-3xl font-bold">Markdown Editor</h1>
      <MDEditor />
    </main>
  )
}

