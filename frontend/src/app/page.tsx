import { VehicleInputForm } from '@/components/forms/VehicleInputForm'
import { Car, Shield, FileText, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <Car className="w-7 h-7 text-primary" />
          <h1 className="text-xl font-bold text-foreground">AI Vehicle Inspector</h1>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6">
          <Zap className="w-4 h-4" />
          Instant AI Report — No Registration Required
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Know exactly what you&apos;re buying
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
          Enter a VIN, Auto.ria link, or upload photos. Our AI analyzes the vehicle
          and generates a professional inspection report in seconds.
        </p>
        <VehicleInputForm />
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Shield, title: 'Auction History', desc: 'Full US auction records with damage photos' },
          { icon: FileText, title: 'PDF Report', desc: 'Professional report you can share with your mechanic' },
          { icon: Zap, title: 'AI Analysis', desc: 'GPT-4 Vision analyzes every photo for hidden damage' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white border rounded-xl p-6 shadow-sm">
            <Icon className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
