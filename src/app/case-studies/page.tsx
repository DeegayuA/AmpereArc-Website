export default function CaseStudiesPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold font-heading mb-12 text-foreground">
          Real Impact, Real Results
        </h1>
        <p className="text-xl text-foreground/80 mb-12">
          Discover how AmpereArc systems are transforming energy independence for homeowners and businesses alike.
        </p>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Placeholder cards */}
          {[1, 2].map((i) => (
            <div key={i} className="bg-card rounded-3xl p-8 border border-border animate-pulse h-80 flex flex-col justify-end">
              <div className="h-6 bg-muted rounded w-1/2 mb-4" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          ))}
        </div>
        <div className="mt-20 text-center text-foreground/50 border-t border-border pt-12">
           <p className="text-lg">Detailed case studies are currently being finalized.</p>
        </div>
      </div>
    </div>
  );
}
