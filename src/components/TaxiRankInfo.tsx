import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Star, Phone, Navigation, Wifi, WifiOff } from "lucide-react";

interface TaxiRank {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  operatingHours: string;
  capacity: number;
  currentAvailability: 'high' | 'medium' | 'low';
  rating: number;
  destinations: string[];
  facilities: string[];
  contact?: string;
  isOfflineDataAvailable: boolean;
  lastUpdated: Date;
}

interface TaxiRankInfoProps {
  ranks: TaxiRank[];
  userLocation?: [number, number];
  onNavigateToRank: (rankId: string) => void;
}

// Mock taxi rank data
const mockRanks: TaxiRank[] = [
  {
    id: "1",
    name: "Johannesburg Central Taxi Rank",
    location: "Corner of Pritchard & Von Wieligh Street",
    coordinates: [-26.2054, 28.0473],
    operatingHours: "05:00 - 22:00",
    capacity: 150,
    currentAvailability: 'high',
    rating: 4.2,
    destinations: ["Rosebank", "Sandton", "Soweto", "Alexandra", "Randburg"],
    facilities: ["Security", "Toilets", "Food vendors", "ATM"],
    contact: "+27 11 123 4567",
    isOfflineDataAvailable: true,
    lastUpdated: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
  },
  {
    id: "2", 
    name: "Bree Street Taxi Rank",
    location: "Bree Street & Harrison Street",
    coordinates: [-26.2041, 28.0378],
    operatingHours: "05:30 - 21:30",
    capacity: 80,
    currentAvailability: 'medium',
    rating: 3.8,
    destinations: ["Sandton", "Midrand", "Centurion", "Pretoria"],
    facilities: ["Security", "Shelter", "Information board"],
    isOfflineDataAvailable: true,
    lastUpdated: new Date(Date.now() - 45 * 60 * 1000) // 45 minutes ago
  },
  {
    id: "3",
    name: "Park Station Taxi Rank", 
    location: "Park Station Transport Hub",
    coordinates: [-26.2044, 28.0416],
    operatingHours: "04:30 - 23:00",
    capacity: 200,
    currentAvailability: 'high',
    rating: 4.5,
    destinations: ["Soweto", "Orange Farm", "Lenasia", "Eldorado Park"],
    facilities: ["Security", "Toilets", "Food court", "ATM", "Waiting area"],
    contact: "+27 11 234 5678",
    isOfflineDataAvailable: false,
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  }
];

export function TaxiRankInfo({ ranks = mockRanks, userLocation, onNavigateToRank }: TaxiRankInfoProps) {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high': return 'status-online';
      case 'medium': return 'status-syncing';
      case 'low': return 'status-offline';
      default: return 'muted';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'high': return 'Many taxis available';
      case 'medium': return 'Some taxis available';
      case 'low': return 'Few taxis available';
      default: return 'Unknown';
    }
  };

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just updated";
    if (diffMins < 60) return `Updated ${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Updated ${diffHours}h ago`;
    return "Data may be outdated";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Nearby Taxi Ranks</h2>
        <p className="text-muted-foreground">
          Find the best taxi rank for your journey
        </p>
      </div>

      <div className="space-y-4">
        {ranks.map((rank) => (
          <Card key={rank.id} className="p-6 shadow-card hover:shadow-warm transition-smooth">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">{rank.name}</h3>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {rank.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {rank.isOfflineDataAvailable ? (
                    <Badge variant="outline" className="status-online">
                      <Wifi className="h-3 w-3 mr-1" />
                      Offline Ready
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="status-offline">
                      <WifiOff className="h-3 w-3 mr-1" />
                      Online Only
                    </Badge>
                  )}
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{rank.operatingHours}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Capacity: {rank.capacity}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {renderStars(rank.rating)}
                    <span className="text-sm text-muted-foreground">({rank.rating})</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Badge className={getAvailabilityColor(rank.currentAvailability)}>
                    {getAvailabilityText(rank.currentAvailability)}
                  </Badge>
                  
                  {rank.contact && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{rank.contact}</span>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    {formatLastUpdated(rank.lastUpdated)}
                  </p>
                </div>
              </div>

              {/* Destinations */}
              <div>
                <h4 className="font-semibold mb-2">Popular Destinations:</h4>
                <div className="flex flex-wrap gap-2">
                  {rank.destinations.map((destination, index) => (
                    <Badge key={index} variant="outline">
                      {destination}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div>
                <h4 className="font-semibold mb-2">Facilities:</h4>
                <div className="flex flex-wrap gap-2">
                  {rank.facilities.map((facility, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  onClick={() => onNavigateToRank(rank.id)}
                  className="flex-1 bg-gradient-sunset border-0 hover:shadow-floating transition-spring"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
                
                {rank.contact && (
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}