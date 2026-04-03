export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold font-heading mb-12 text-foreground">
          Energy Insights & Blog
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-3xl p-6 border border-border animate-pulse">
              <div className="h-48 bg-muted rounded-2xl mb-6" />
              <div className="h-6 bg-muted rounded w-3/4 mb-4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
        <div className="mt-16 p-12 bg-secondary/10 rounded-3xl text-center border border-secondary/20">
           <h2 className="text-2xl font-bold font-heading mb-4 text-primary">Content coming soon</h2>
           <p className="text-foreground/70">Our team is preparing high-quality energy insights and company updates. Stay tuned!</p>
        </div>
      </div>
    </div>
  );
}
