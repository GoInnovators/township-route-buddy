import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hand, MapPin, AlertCircle, BookOpen } from "lucide-react";

interface HandSign {
  id: string;
  destination: string;
  gesture: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  commonAreas: string[];
}

interface HandSignsGuideProps {
  selectedDestination?: string;
  onPracticeMode?: () => void;
}

// Hand signs data for South African taxi system
const handSigns: HandSign[] = [
  {
    id: "1",
    destination: "Johannesburg CBD",
    gesture: "Point index finger up",
    description: "Hold your hand up with index finger pointing straight up to signal you want to go to the city center.",
    icon: "☝️",
    difficulty: 'easy',
    commonAreas: ["Soweto", "Alexandra", "Randburg"]
  },
  {
    id: "2", 
    destination: "Rosebank",
    gesture: "Form a 'C' with thumb and index finger",
    description: "Make a 'C' shape with your thumb and index finger to indicate Rosebank destination.",
    icon: "👌",
    difficulty: 'medium',
    commonAreas: ["Johannesburg CBD", "Sandton", "Alexandra"]
  },
  {
    id: "3",
    destination: "Sandton",
    gesture: "Raise hand with palm open",
    description: "Raise your hand high with palm facing forward and fingers spread to signal Sandton.",
    icon: "✋",
    difficulty: 'easy',
    commonAreas: ["Johannesburg CBD", "Soweto", "Midrand"]
  },
  {
    id: "4",
    destination: "Soweto",
    gesture: "Point with two fingers",
    description: "Point forward with index and middle finger extended to indicate Soweto direction.",
    icon: "✌️",
    difficulty: 'easy',
    commonAreas: ["Johannesburg CBD", "Roodepoort", "Lenasia"]
  },
  {
    id: "5",
    destination: "Randburg",
    gesture: "Circular motion with index finger",
    description: "Make small circular motions with your index finger to signal Randburg destination.",
    icon: "👆",
    difficulty: 'hard',
    commonAreas: ["Johannesburg CBD", "Sandton", "Rosebank"]
  },
  {
    id: "6",
    destination: "Alexandra (Alex)",
    gesture: "Point sideways with thumb",
    description: "Point sideways with your thumb extended to indicate Alexandra township.",
    icon: "👍",
    difficulty: 'medium',
    commonAreas: ["Johannesburg CBD", "Sandton", "Midrand"]
  },
  {
    id: "7",
    destination: "Midrand",
    gesture: "Flat hand moved horizontally",
    description: "Hold hand flat and move it horizontally side to side to signal Midrand.",
    icon: "🤚",
    difficulty: 'medium',
    commonAreas: ["Johannesburg CBD", "Sandton", "Centurion"]
  },
  {
    id: "8",
    destination: "Pretoria",
    gesture: "Point forward with closed fist",
    description: "Make a closed fist and point forward firmly to indicate Pretoria destination.",
    icon: "👊",
    difficulty: 'easy',
    commonAreas: ["Johannesburg CBD", "Midrand", "Centurion"]
  }
];

export function HandSignsGuide({ selectedDestination, onPracticeMode }: HandSignsGuideProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'status-online';
      case 'medium': return 'status-syncing';
      case 'hard': return 'status-offline';
      default: return 'muted';
    }
  };

  const filteredSigns = selectedDestination 
    ? handSigns.filter(sign => 
        sign.destination.toLowerCase().includes(selectedDestination.toLowerCase()) ||
        sign.commonAreas.some(area => area.toLowerCase().includes(selectedDestination.toLowerCase()))
      )
    : handSigns;

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Hand className="h-6 w-6 text-primary" />
          Taxi Hand Signs Guide
        </h2>
        <p className="text-muted-foreground mb-4">
          Learn the hand signals to catch the right taxi
        </p>
        
        {selectedDestination && (
          <Badge variant="outline" className="mb-4">
            <MapPin className="h-3 w-3 mr-1" />
            Showing signs for: {selectedDestination}
          </Badge>
        )}

        <Card className="p-4 bg-accent/10 border-accent/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-accent mt-0.5" />
            <div className="text-left">
              <h4 className="font-semibold text-accent mb-1">Important Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Make hand signs clearly and confidently</li>
                <li>• Stand in a visible location near the road</li>
                <li>• Some signs may vary by region - ask locals if unsure</li>
                <li>• Always confirm your destination with the driver</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4">
        {filteredSigns.map((sign) => (
          <Card key={sign.id} className="p-6 shadow-card hover:shadow-warm transition-smooth">
            <div className="flex items-start gap-4">
              <div className="text-center min-w-[80px]">
                <div className="text-4xl mb-2">{sign.icon}</div>
                <Badge className={getDifficultyColor(sign.difficulty)}>
                  {sign.difficulty}
                </Badge>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{sign.destination}</h3>
                  <Badge variant="outline">
                    {sign.gesture}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  {sign.description}
                </p>
                
                <div className="space-y-2">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Common pickup areas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {sign.commonAreas.map((area, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredSigns.length === 0 && (
        <Card className="p-8 text-center">
          <Hand className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No hand signs found</h3>
          <p className="text-muted-foreground">
            Try searching for a different destination or view all available signs.
          </p>
        </Card>
      )}

      {onPracticeMode && (
        <Card className="p-6 bg-gradient-sunset text-primary-foreground">
          <div className="text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-2">Practice Mode</h3>
            <p className="text-primary-foreground/80 mb-4">
              Test your knowledge with interactive hand sign quizzes
            </p>
            <Button 
              onClick={onPracticeMode}
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              Start Practice Quiz
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}