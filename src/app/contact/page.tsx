export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold font-heading mb-6 text-foreground text-center">
          Got a Question?
        </h1>
        <p className="text-xl text-foreground/80 mb-12 text-center">
          Welcome to AmpereArc Support. Need some support? You’ve come to the right place! The team is here to help.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card p-8 rounded-3xl border border-border">
            <h3 className="font-heading font-bold text-2xl mb-4">Knowledge Base</h3>
            <p className="text-card-foreground/70 mb-6 text-sm">Designed for both installers and users our new Knowledge Base contains a myriad of details and documents to help answer your questions.</p>
            <button className="text-primary font-bold hover:underline">Visit Knowledge Base</button>
          </div>
          <div className="bg-card p-8 rounded-3xl border border-border">
            <h3 className="font-heading font-bold text-2xl mb-4">Troubleshooting</h3>
            <p className="text-card-foreground/70 mb-6 text-sm">This guide helps you identify and resolve issues with batteries not charging or discharging.</p>
            <button className="text-primary font-bold hover:underline">View Guides</button>
          </div>
        </div>

        <div className="text-center bg-secondary text-secondary-foreground p-12 rounded-3xl">
           <h2 className="text-3xl font-bold font-heading mb-6">Can’t Find Your Answer?</h2>
           <p className="text-lg opacity-80 mb-2 font-medium">
             Email – <a href="mailto:Info@amperearc.com" className="hover:underline opacity-100 font-bold decoration-primary underline-offset-4">Info@amperearc.com</a>
           </p>
           <p className="text-lg opacity-80 font-medium">
             Call Us On – <a href="tel:+447766130423" className="hover:underline opacity-100 font-bold decoration-primary underline-offset-4">+44 7766 130423</a>
           </p>
        </div>
      </div>
    </div>
  );
}
