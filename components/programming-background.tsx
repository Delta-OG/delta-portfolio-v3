export function ProgrammingBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10 dark:opacity-5">
      {/* Code snippets floating in background */}
      <div className="absolute top-10 left-10 text-xs font-mono text-muted-foreground rotate-12">
        <pre>{`const developer = {
  name: "Delta",
  skills: ["React", "TypeScript"],
  passion: "coding"
};`}</pre>
      </div>

      <div className="absolute top-32 right-20 text-xs font-mono text-muted-foreground -rotate-6">
        <pre>{`function createAwesome() {
  return "Hello World!";
}`}</pre>
      </div>

      <div className="absolute bottom-20 left-20 text-xs font-mono text-muted-foreground rotate-6">
        <pre>{`// Building the future
npm install creativity
git commit -m "Added magic"`}</pre>
      </div>

      <div className="absolute bottom-32 right-10 text-xs font-mono text-muted-foreground -rotate-12">
        <pre>{`<Portfolio>
  <Skills />
  <Projects />
  <Dreams />
</Portfolio>`}</pre>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-20 h-20 border border-primary/20 rotate-45"></div>
      <div className="absolute top-3/4 right-1/4 w-16 h-16 border border-primary/20 rounded-full"></div>
      <div className="absolute top-1/2 left-1/6 w-12 h-12 border border-primary/20"></div>

      {/* Binary pattern */}
      <div className="absolute top-0 right-0 text-xs font-mono text-muted-foreground/30 leading-3">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i}>{Array.from({ length: 30 }, () => (Math.random() > 0.5 ? "1" : "0")).join("")}</div>
        ))}
      </div>
    </div>
  )
}
