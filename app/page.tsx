import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Rocket, Shield, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Invest in Tomorrow's
            <span className="text-primary"> Game-Changers</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of investors backing innovative startups.
            Invest with as little as ₹250 using crypto or traditional payment methods.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/startups">
              <Button size="lg" className="text-lg">
                Browse Startups
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Crowwd Bank?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <Rocket className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Curated Startups</h3>
              <p className="text-muted-foreground">
                We carefully vet each startup to ensure quality investment opportunities.
              </p>
            </Card>
            <Card className="p-6">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Investment</h3>
              <p className="text-muted-foreground">
                Industry-leading security measures protect your investments and data.
              </p>
            </Card>
            <Card className="p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community-Driven</h3>
              <p className="text-muted-foreground">
                Join a community of investors and entrepreneurs sharing insights.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Startups Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Opportunities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${i === 1 ? '1556761175-5973dc0f32e7' : i === 2 ? '1556761175-9c46ee1df122' : '1557804506-669a67965ba0'}?auto=format&fit=crop&w=800&q=80`}
                  alt="Startup"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {i === 1 ? 'EcoTech Solutions' : i === 2 ? 'HealthAI' : 'FinanceFlow'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {i === 1 ? 'Sustainable energy solutions' : i === 2 ? 'AI-powered healthcare' : 'Decentralized finance platform'}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Raised</p>
                      <p className="font-semibold">${(i * 250000).toLocaleString()}</p>
                    </div>
                    <Link href={`/startups/${i}`}>
                      <Button>Learn More</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
