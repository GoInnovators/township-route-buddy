import { useState, useEffect } from "react";
import { TripPlannerHeader } from "@/components/TripPlannerHeader";
import { RouteResults } from "@/components/RouteResults";
import { SafetyTips } from "@/components/SafetyTips";
import { TaxiRankInfo } from "@/components/TaxiRankInfo";
import { HandSignsGuide } from "@/components/HandSignsGuide";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Route, 
  Shield, 
  MapPin, 
  Hand, 
  Navigation2, 
  Download,
  MapIcon,
  Wifi,
  WifiOff
} from "lucide-react";

interface AppState {
  isOnline: boolean;
  lastSync: Date | null;
  searchResults: {
    from: string;
    to: string;
    results: any[];
  } | null;
  activeTab: string;
  currentLocation: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>({
    isOnline: navigator.onLine,
    lastSync: new Date(),
    searchResults: null,
    activeTab: 'trip-planner',
    currentLocation: 'Johannesburg CBD',
    timeOfDay: 'afternoon'
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setAppState(prev => ({ 
        ...prev, 
        isOnline: true,
        lastSync: new Date()
      }));
    };

    const handleOffline = () => {
      setAppState(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Determine time of day
  useEffect(() => {
    const hour = new Date().getHours();
    let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    
    if (hour >= 5 && hour < 12) timeOfDay = 'morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
    else timeOfDay = 'night';

    setAppState(prev => ({ ...prev, timeOfDay }));
  }, []);

  const handleSearch = (from: string, to: string) => {
    setAppState(prev => ({
      ...prev,
      searchResults: { from, to, results: [] },
      activeTab: 'routes'
    }));
  };

  const handleSelectRoute = (routeId: string) => {
    console.log('Selected route:', routeId);
    // Here you would typically start navigation or save the route
  };

  const handleNavigateToRank = (rankId: string) => {
    console.log('Navigate to rank:', rankId);
    // Here you would typically open navigation to the taxi rank
  };

  const getTimeBasedGreeting = () => {
    switch (appState.timeOfDay) {
      case 'morning': return 'Good morning! Plan your commute safely.';
      case 'afternoon': return 'Good afternoon! Find the best routes.';
      case 'evening': return 'Good evening! Travel safely tonight.';
      case 'night': return 'Traveling late? Check safety tips first.';
      default: return 'Plan your journey with confidence.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Header */}
      <TripPlannerHeader
        isOnline={appState.isOnline}
        lastSync={appState.lastSync}
        onSearch={handleSearch}
        onMenuClick={() => setIsMenuOpen(true)}
      />

      {/* Offline status banner */}
      {!appState.isOnline && (
        <div className="bg-status-offline text-white p-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <WifiOff className="h-4 w-4" />
            <span className="font-medium">Offline Mode</span>
            <Badge variant="outline" className="border-white text-white">
              Limited features available
            </Badge>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl">
        {!appState.searchResults ? (
          /* Welcome Screen */
          <div className="p-6 space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-card">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {getTimeBasedGreeting()}
                </h2>
                <p className="text-muted-foreground">
                  Your offline-first companion for safe and efficient travel across South African townships and cities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 border-2 border-primary/20 hover:border-primary/40 transition-smooth cursor-pointer"
                      onClick={() => setAppState(prev => ({ ...prev, activeTab: 'safety' }))}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Shield className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Safety First</h3>
                      <p className="text-sm text-muted-foreground">Get location-based safety tips</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-2 border-primary/20 hover:border-primary/40 transition-smooth cursor-pointer"
                      onClick={() => setAppState(prev => ({ ...prev, activeTab: 'ranks' }))}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Find Taxi Ranks</h3>
                      <p className="text-sm text-muted-foreground">Locate nearby ranks & info</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-2 border-primary/20 hover:border-primary/40 transition-smooth cursor-pointer"
                      onClick={() => setAppState(prev => ({ ...prev, activeTab: 'hand-signs' }))}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <Hand className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Hand Signs Guide</h3>
                      <p className="text-sm text-muted-foreground">Learn taxi hand signals</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-2 border-primary/20 hover:border-primary/40 transition-smooth">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Download className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Offline Maps</h3>
                      <p className="text-sm text-muted-foreground">Download for offline use</p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>

            {/* Quick offline status */}
            <Card className="p-4 bg-gradient-sunset text-primary-foreground">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapIcon className="h-6 w-6" />
                  <div>
                    <h3 className="font-semibold">Ready for Offline Use</h3>
                    <p className="text-primary-foreground/80 text-sm">
                      Core features work without internet connection
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-primary-foreground border-0">
                  {appState.isOnline ? (
                    <><Wifi className="h-3 w-3 mr-1" /> Connected</>
                  ) : (
                    <><WifiOff className="h-3 w-3 mr-1" /> Offline</>
                  )}
                </Badge>
              </div>
            </Card>
          </div>
        ) : (
          /* Search Results */
          <div className="space-y-6">
            <RouteResults
              from={appState.searchResults.from}
              to={appState.searchResults.to}
              routes={appState.searchResults.results}
              onSelectRoute={handleSelectRoute}
            />
            
            <div className="flex gap-2 px-6">
              <Button 
                variant="outline" 
                onClick={() => setAppState(prev => ({ ...prev, searchResults: null }))}
              >
                New Search
              </Button>
              <Button 
                variant="outline"
                onClick={() => setAppState(prev => ({ ...prev, activeTab: 'safety' }))}
              >
                <Shield className="h-4 w-4 mr-2" />
                Safety Tips
              </Button>
            </div>
          </div>
        )}

        {/* Tabs for other features */}
        {appState.activeTab !== 'trip-planner' && !appState.searchResults && (
          <Tabs value={appState.activeTab} onValueChange={(value) => setAppState(prev => ({ ...prev, activeTab: value }))}>
            <TabsList className="grid w-full grid-cols-4 mx-6 mb-6">
              <TabsTrigger value="safety">
                <Shield className="h-4 w-4 mr-1" />
                Safety
              </TabsTrigger>
              <TabsTrigger value="ranks">
                <MapPin className="h-4 w-4 mr-1" />
                Ranks
              </TabsTrigger>
              <TabsTrigger value="hand-signs">
                <Hand className="h-4 w-4 mr-1" />
                Signs
              </TabsTrigger>
              <TabsTrigger value="trip-planner" onClick={() => setAppState(prev => ({ ...prev, searchResults: null }))}>
                <Route className="h-4 w-4 mr-1" />
                Plan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="safety">
              <SafetyTips 
                location={appState.currentLocation}
                timeOfDay={appState.timeOfDay}
              />
            </TabsContent>

            <TabsContent value="ranks">
              <TaxiRankInfo
                ranks={[]}
                onNavigateToRank={handleNavigateToRank}
              />
            </TabsContent>

            <TabsContent value="hand-signs">
              <HandSignsGuide />
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Side menu for additional features */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="left" className="w-80">
          <div className="py-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">TaxiGo</h2>
              <p className="text-muted-foreground text-sm">
                Offline-first transport companion
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  setAppState(prev => ({ ...prev, activeTab: 'trip-planner', searchResults: null }));
                  setIsMenuOpen(false);
                }}
              >
                <Route className="h-4 w-4 mr-3" />
                Trip Planner
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  setAppState(prev => ({ ...prev, activeTab: 'safety' }));
                  setIsMenuOpen(false);
                }}
              >
                <Shield className="h-4 w-4 mr-3" />
                Safety Tips
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  setAppState(prev => ({ ...prev, activeTab: 'ranks' }));
                  setIsMenuOpen(false);
                }}
              >
                <MapPin className="h-4 w-4 mr-3" />
                Taxi Ranks
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  setAppState(prev => ({ ...prev, activeTab: 'hand-signs' }));
                  setIsMenuOpen(false);
                }}
              >
                <Hand className="h-4 w-4 mr-3" />
                Hand Signs
              </Button>
            </div>

            <div className="pt-6 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Connection Status</span>
                <Badge className={appState.isOnline ? 'status-online' : 'status-offline'}>
                  {appState.isOnline ? (
                    <><Wifi className="h-3 w-3 mr-1" /> Online</>
                  ) : (
                    <><WifiOff className="h-3 w-3 mr-1" /> Offline</>
                  )}
                </Badge>
              </div>
              
              {appState.lastSync && (
                <p className="text-xs text-muted-foreground">
                  Last synced: {appState.lastSync.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;