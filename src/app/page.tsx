import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Brain, HeartHandshake, MessageCircle, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-slate-900 animate-gradient-xy">

      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-secondary/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-4000 opacity-50"></div>
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 md:py-24 lg:py-32 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-black/20 border border-white/40 dark:border-white/10 shadow-sm backdrop-blur-md mb-8 animate-fade-in-up">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-foreground/80">AI-Powered Support Available 24/7</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-primary to-gray-600 dark:from-white dark:via-primary/80 dark:to-gray-400 font-headline drop-shadow-sm leading-tight pb-2">
          Your Mind Matters,<br /> We're Here to Listen.
        </h1>

        <p className="max-w-[42rem] leading-relaxed text-muted-foreground sm:text-xl sm:leading-8 mb-12 animate-fade-in-up delay-100">
          PsyConnect offers a safe, anonymous space for students to seek guidance, track their mood, and connect with professional counselors.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full justify-center animate-fade-in-up delay-200 flex-wrap">
          <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300" asChild>
            <Link href="/login/student">
              I'm a Student
              <Brain className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg bg-white/40 dark:bg-black/20 backdrop-blur-md border-white/40 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300" asChild>
            <Link href="/login/counselor">
              For Counselors
            </Link>
          </Button>
          <Button size="lg" variant="ghost" className="rounded-full px-8 h-14 text-lg hover:bg-white/20 transition-all duration-300 border border-transparent hover:border-white/20" asChild>
            <Link href="/login/admin">
              Admin Access
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <FeatureCard
          icon={<MessageCircle className="h-8 w-8 text-primary" />}
          title="Instant AI Chat"
          description="Talk to our empathetic AI assistant anytime for immediate support and guidance."
        />
        <FeatureCard
          icon={<ShieldCheck className="h-8 w-8 text-secondary" />}
          title="Private & Secure"
          description="Your conversations are confidential. We prioritize your privacy and data security."
        />
        <FeatureCard
          icon={<HeartHandshake className="h-8 w-8 text-accent" />}
          title="Professional Help"
          description="Easily book appointments with verified school counselors when you need extra support."
        />
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass border-white/20 dark:border-white/10 p-8 rounded-2xl flex flex-col items-center text-center gap-5 group hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-2xl">
      <div className="p-4 rounded-2xl bg-white/50 dark:bg-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/50 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/40 dark:to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {icon}
      </div>
      <h3 className="text-xl font-bold font-headline text-foreground/90">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{description}</p>
    </div>
  );
}
