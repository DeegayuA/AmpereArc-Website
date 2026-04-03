export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Home Energy: Why BESS is the Missing Link",
    slug: "future-of-home-energy-bess",
    excerpt: "Discover how Battery Energy Storage Systems (BESS) are revolutionizing how we power our homes and interact with the grid.",
    date: "April 1, 2024",
    readTime: "5 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1000&auto=format&fit=crop",
    content: `
      <h2>The Energy Revolution is Here</h2>
      <p>For decades, the promise of solar energy was hampered by one simple fact: the sun doesn't shine at night. While net metering helped, true energy independence remained elusive for most homeowners. Enter the <strong>Battery Energy Storage System (BESS)</strong>.</p>
      
      <p>At AmpereArc, we believe that BESS is the final piece of the puzzle. By storing excess solar generation during the day, homeowners can now power their lives through the evening and night without drawing a single watt from the grid.</p>
      
      <h3>Key Benefits of Modern BESS:</h3>
      <ul>
        <li><strong>Peak Shaving:</strong> Avoid high electricity prices during evening peak hours.</li>
        <li><strong>Backup Power:</strong> Keep your essential appliances running during grid outages.</li>
        <li><strong>Grid Stabilization:</strong> Contribute to a more resilient, decentralized energy network.</li>
      </ul>
      
      <p>As battery technology continues to evolve, we're seeing higher energy densities and longer life cycles than ever before. Products like our <em>EcoStack Home</em> are leading the charge, offering lithium-ion reliability with intelligent software management.</p>
      
      <h3>Conclusion</h3>
      <p>Investing in energy storage isn't just about saving money; it's about taking control of your home's most vital resource. The future is bright, and it's powered by storage.</p>
    `
  },
  {
    id: "2",
    title: "Maximizing Your ROI: Tips for Solar Maintenance",
    slug: "maximize-solar-roi",
    excerpt: "Learn the essential maintenance steps to ensure your solar panels and inverters operate at peak efficiency for years to come.",
    date: "March 25, 2024",
    readTime: "4 min read",
    category: "Maintenance",
    image: "https://images.unsplash.com/photo-1508514177221-18d14037b7b2?q=80&w=1000&auto=format&fit=crop",
    content: `
      <h2>Solar is an Investment, Protect It</h2>
      <p>Installing a solar array is a significant investment. To ensure you reach your ROI as quickly as possible, regular maintenance is key. While solar systems are generally low-maintenance, a little care goes a long way.</p>
      
      <h3>1. Keep Them Clean</h3>
      <p>Dust, bird droppings, and pollen can create a film over your panels, reducing their ability to absorb sunlight. A simple hose-down every few months can increase efficiency by up to 10%.</p>
      
      <h3>2. Monitor Performance</h3>
      <p>Use the AmpereArc Cloud app to check your daily generation. If you see a sudden drop that isn't explained by weather, it might be time for a professional check-up.</p>
      
      <h3>3. Inverter Care</h3>
      <p>The inverter is the workhorse of your system. Ensure it has proper ventilation and is kept out of direct, mid-day sun if possible to prevent overheating.</p>
      
      <p>By following these simple steps, you can ensure your system remains a green-energy powerhouse for decades.</p>
    `
  },
  {
    id: "3",
    title: "AmpereArc Expands: New Commercial Solutions for 2024",
    slug: "amperearc-commercial-expansion-2024",
    excerpt: "We are excited to announce our new line of industrial-scale energy solutions designed for factories and data centers.",
    date: "March 15, 2024",
    readTime: "3 min read",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop",
    content: `
      <h2>Powering Large-Scale Change</h2>
      <p>AmpereArc has always been a leader in residential energy, but today we are taking a massive step forward. We are officially launching our <strong>Industrial Core</strong> suite.</p>
      
      <p>Designed for the rigorous demands of manufacturing and high-uptime data centers, our new 1MWh containers and high-voltage inverters are built to scale. We're already partnering with major logistics hubs to reduce their carbon footprints by over 40%.</p>
      
      <blockquote>
        "Our goal is to provide every business, regardless of size, the tools to achieve energy autonomy."
        <br/>— CEO, AmpereArc
      </blockquote>
      
      <p>Stay tuned for more updates as we deploy our first fleet of industrial units across the country.</p>
    `
  }
];
