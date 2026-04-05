import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText, AlertCircle, ShoppingCart } from "lucide-react";
import { products, siteConfig } from "@/lib/data";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted/30 pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 hover:text-primary transition-colors mb-8 md:mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        <div className="bg-background rounded-[2.5rem] md:rounded-[3.5rem] border border-border/40 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Showcase */}
            <div className="bg-zinc-100 dark:bg-zinc-800/50 p-12 md:p-20 flex items-center justify-center relative min-h-[400px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)] z-0" />
              {!siteConfig.hideAllPrices && product.discountPercentage > 0 && (
                <div className="absolute top-8 left-8 z-20">
                   <div className="bg-primary text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20">
                     -{product.discountPercentage}%
                   </div>
                </div>
              )}
              <Image
                src={product.img}
                alt={product.title}
                width={800}
                height={800}
                className="object-contain relative z-10 hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4">
                <span>{product.category}</span>
                <div className="h-[2px] w-2 bg-primary/40 rounded-full" />
                <span>{product.subCategory}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black font-heading leading-[1.1] mb-6">
                {product.title}
              </h1>

              <p className="text-foreground/70 font-medium text-lg leading-relaxed mb-8">
                {product.desc}
              </p>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-2 mb-10">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary/10 border border-border/40 text-foreground/60 rounded-md text-[10px] font-black uppercase tracking-widest"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Pricing Module */}
              {!siteConfig.hideAllPrices && (
                <div className="mb-10 pb-10 border-b border-border/30">
                  <span className="font-black uppercase tracking-widest text-foreground/40 leading-none text-[10px] block mb-2">
                    Pricing Estimate
                  </span>
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-black font-heading text-primary">
                      ${((1 - product.discountPercentage / 100) * product.basePrice).toLocaleString()}
                    </span>
                    <span className="text-2xl font-bold text-foreground/30 line-through decoration-primary/40 decoration-2">
                      ${product.basePrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Notice Area */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h4 className="font-black uppercase tracking-widest text-primary text-sm mb-1">
                    Extended Technical Data
                  </h4>
                  <p className="text-sm font-medium text-foreground/70 leading-relaxed mb-4">
                    Full engineering specifications, CAD models, electrical schematics, and official datasheets will be available to download soon.
                  </p>
                  <button className="flex items-center gap-2 bg-background border-2 border-primary/20 hover:border-primary text-foreground px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                    <FileText className="w-4 h-4" /> Request Datasheet
                  </button>
                </div>
              </div>
              
              <div className="mt-8 flex gap-4">
                 <button className="flex-1 bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" /> Add to Proposal
                 </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
