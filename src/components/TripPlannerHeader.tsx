import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Wifi, WifiOff, RotateCcw, Menu } from "lucide-react";

interface TripPlannerHeaderProps {
  isOnline: boolean;
  lastSync: Date | null;
  onSearch: (from: string, to: string) => void;
  onMenuClick: () => void;
}

export function TripPlannerHeader({ isOnline, lastSync, onSearch, onMenuClick }: TripPlannerHeaderProps) {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  const handleSearch = () => {
    if (fromLocation.trim() && toLocation.trim()) {
      onSearch(fromLocation, toLocation);
    }
  };

  const formatLastSync = (date: Date | null) => {
    if (!date) return "Never synced";
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="relative">
      {/* Background with gradient */}
      <div className="bg-gradient-sunset p-6 rounded-b-3xl shadow-warm">
        {/* Header with status */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onMenuClick}
            className="text-primary-foreground hover:bg-white/20"
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <div className="flex items-center gap-3">
            <Badge 
              variant={isOnline ? "default" : "destructive"} 
              className={`${isOnline ? 'status-online' : 'status-offline'} transition-smooth`}
            >
              {isOnline ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
              {isOnline ? "Online" : "Offline"}
            </Badge>
            
            {lastSync && (
              <Badge variant="outline" className="text-primary-foreground border-white/30 bg-white/10">
                <RotateCcw className="h-3 w-3 mr-1" />
                {formatLastSync(lastSync)}
              </Badge>
            )}
          </div>
        </div>

        {/* App title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            TaxiGo
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Your offline-first transport companion
          </p>
        </div>

        {/* Trip planner form */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-card">
          <div className="p-6 space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="From (Your location)"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            
            <div className="relative">
              <Navigation className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="To (e.g., Rosebank)"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="pl-10 h-12 text-base"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <Button 
              onClick={handleSearch}
              className="w-full h-12 text-base font-semibold bg-gradient-sunset border-0 hover:shadow-floating transition-spring"
              disabled={!fromLocation.trim() || !toLocation.trim()}
            >
              Find Routes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}