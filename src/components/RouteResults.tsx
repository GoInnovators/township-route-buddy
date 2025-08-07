import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, DollarSign, Users, AlertTriangle, Navigation2 } from "lucide-react";

interface RouteOption {
  id: string;
  duration: string;
  price: string;
  steps: RouteStep[];
  safetyRating: 'high' | 'medium' | 'low';
  totalDistance: string;
}

interface RouteStep {
  type: 'walk' | 'taxi' | 'wait';
  description: string;
  duration: string;
  details?: string;
  taxiRank?: string;
  handSign?: string;
}

interface RouteResultsProps {
  from: string;
  to: string;
  routes: RouteOption[];
  onSelectRoute: (routeId: string) => void;
}

// Mock data for demonstration
const mockRoutes: RouteOption[] = [
  {
    id: "1",
    duration: "45 min",
    price: "R25-30",
    totalDistance: "12.5 km",
    safetyRating: 'high',
    steps: [
      {
        type: 'walk',
        description: 'Walk to Johannesburg Central Taxi Rank',
        duration: '8 min',
        details: '650m walk'
      },
      {
        type: 'taxi',
        description: 'Take taxi to Rosebank',
        duration: '35 min',
        details: 'White taxi with red stripe',
        taxiRank: 'Johannesburg Central',
        handSign: 'Point index finger up'
      },
      {
        type: 'walk',
        description: 'Walk to destination',
        duration: '2 min',
        details: '150m walk'
      }
    ]
  },
  {
    id: "2",
    duration: "52 min",
    price: "R20-25",
    totalDistance: "15.2 km",
    safetyRating: 'medium',
    steps: [
      {
        type: 'walk',
        description: 'Walk to Bree Street Taxi Rank',
        duration: '12 min',
        details: '850m walk'
      },
      {
        type: 'taxi',
        description: 'Take taxi to Sandton',
        duration: '30 min',
        details: 'Blue taxi',
        taxiRank: 'Bree Street',
        handSign: 'Raise hand with palm open'
      },
      {
        type: 'taxi',
        description: 'Transfer to Rosebank taxi',
        duration: '8 min',
        details: 'Green taxi',
        handSign: 'Point with two fingers'
      },
      {
        type: 'walk',
        description: 'Walk to destination',
        duration: '2 min',
        details: '120m walk'
      }
    ]
  }
];

export function RouteResults({ from, to, routes = mockRoutes, onSelectRoute }: RouteResultsProps) {
  const getSafetyColor = (rating: string) => {
    switch (rating) {
      case 'high': return 'status-online';
      case 'medium': return 'status-syncing';
      case 'low': return 'status-offline';
      default: return 'muted';
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'walk': return <MapPin className="h-4 w-4" />;
      case 'taxi': return <Users className="h-4 w-4" />;
      case 'wait': return <Clock className="h-4 w-4" />;
      default: return <Navigation2 className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Route Options</h2>
        <p className="text-muted-foreground">
          From <span className="font-semibold">{from}</span> to <span className="font-semibold">{to}</span>
        </p>
      </div>

      <div className="space-y-4">
        {routes.map((route, index) => (
          <Card key={route.id} className="p-6 shadow-card hover:shadow-warm transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <Badge variant="outline" className="font-bold text-base px-3 py-1">
                    #{index + 1}
                  </Badge>
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-1">
                    <span className="font-bold text-lg flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {route.duration}
                    </span>
                    <span className="text-success font-semibold flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {route.price}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{route.totalDistance}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={getSafetyColor(route.safetyRating)}>
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {route.safetyRating.charAt(0).toUpperCase() + route.safetyRating.slice(1)} Safety
                </Badge>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              {route.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="mt-1 text-muted-foreground">
                    {getStepIcon(step.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{step.description}</p>
                      <span className="text-sm text-muted-foreground">{step.duration}</span>
                    </div>
                    {step.details && (
                      <p className="text-sm text-muted-foreground mt-1">{step.details}</p>
                    )}
                    {step.taxiRank && (
                      <p className="text-sm text-accent font-medium mt-1">
                        📍 Rank: {step.taxiRank}
                      </p>
                    )}
                    {step.handSign && (
                      <p className="text-sm text-primary font-medium mt-1">
                        ✋ Hand sign: {step.handSign}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => onSelectRoute(route.id)}
              className="w-full bg-gradient-sunset border-0 hover:shadow-floating transition-spring"
            >
              Select This Route
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}