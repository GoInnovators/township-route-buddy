import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Eye, Phone, MapPin, Clock } from "lucide-react";

interface SafetyTip {
  id: string;
  type: 'warning' | 'info' | 'emergency';
  icon: React.ReactNode;
  title: string;
  description: string;
  location?: string;
  timeRelevant?: string;
}

interface SafetyTipsProps {
  location: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

export function SafetyTips({ location, timeOfDay }: SafetyTipsProps) {
  // Mock safety tips based on location and time
  const getSafetyTips = (): SafetyTip[] => {
    const baseTips: SafetyTip[] = [
      {
        id: "1",
        type: 'info',
        icon: <Shield className="h-5 w-5" />,
        title: "Keep belongings secure",
        description: "Hold your bag in front of you and avoid displaying expensive items like phones openly."
      },
      {
        id: "2",
        type: 'info',
        icon: <Eye className="h-5 w-5" />,
        title: "Stay alert",
        description: "Be aware of your surroundings and trust your instincts. If something feels wrong, find a safe place."
      },
      {
        id: "3",
        type: 'emergency',
        icon: <Phone className="h-5 w-5" />,
        title: "Emergency contacts",
        description: "Police: 10111 | Medical: 10177 | Keep these numbers saved and accessible."
      }
    ];

    // Add time-specific tips
    if (timeOfDay === 'evening' || timeOfDay === 'night') {
      baseTips.unshift({
        id: "time-warning",
        type: 'warning',
        icon: <AlertTriangle className="h-5 w-5" />,
        title: "Late hour travel",
        description: "Avoid traveling alone after dark. Consider sharing your journey with someone or using well-lit routes.",
        timeRelevant: timeOfDay
      });
    }

    // Add location-specific tips
    if (location.toLowerCase().includes('johannesburg') || location.toLowerCase().includes('joburg')) {
      baseTips.push({
        id: "location-tip",
        type: 'info',
        icon: <MapPin className="h-5 w-5" />,
        title: "Johannesburg CBD safety",
        description: "Stay in groups when possible and use main taxi ranks. Avoid side streets and unofficial pick-up points.",
        location: "Johannesburg CBD"
      });
    }

    return baseTips;
  };

  const tips = getSafetyTips();

  const getCardStyle = (type: string) => {
    switch (type) {
      case 'warning': return 'border-l-4 border-l-destructive bg-destructive/5';
      case 'emergency': return 'border-l-4 border-l-accent bg-accent/5';
      default: return 'border-l-4 border-l-success bg-success/5';
    }
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-destructive text-destructive-foreground';
      case 'emergency': return 'bg-accent text-accent-foreground';
      default: return 'bg-success text-success-foreground';
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Shield className="h-6 w-6 text-success" />
          Safety Tips
        </h2>
        <p className="text-muted-foreground">
          Stay safe while traveling in {location}
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground capitalize">
            {timeOfDay} travel guidance
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {tips.map((tip) => (
          <Card key={tip.id} className={`p-4 transition-smooth hover:shadow-card ${getCardStyle(tip.type)}`}>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${getBadgeStyle(tip.type)}`}>
                {tip.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{tip.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {tip.type === 'warning' ? 'Warning' : tip.type === 'emergency' ? 'Emergency' : 'Tip'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tip.description}
                </p>
                {tip.location && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-accent">
                    <MapPin className="h-3 w-3" />
                    <span>Specific to {tip.location}</span>
                  </div>
                )}
                {tip.timeRelevant && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-primary">
                    <Clock className="h-3 w-3" />
                    <span>Relevant for {tip.timeRelevant} travel</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick emergency card */}
      <Card className="p-4 bg-gradient-safety text-white">
        <div className="text-center">
          <h3 className="font-bold mb-2">In case of emergency</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Police</p>
              <p className="text-lg font-bold">10111</p>
            </div>
            <div>
              <p className="font-semibold">Medical</p>
              <p className="text-lg font-bold">10177</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}