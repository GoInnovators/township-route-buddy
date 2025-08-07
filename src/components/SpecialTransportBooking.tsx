import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Clock, Phone, Star, Car, CheckCircle2 } from "lucide-react";
import { demoBookings, demoSpecialServices } from "@/data/demoData";

interface BookingFormData {
  from: string;
  to: string;
  date: string;
  time: string;
  passengers: number;
  specialRequirements: string;
  contactPhone: string;
  contactName: string;
}

export const SpecialTransportBooking = () => {
  const [activeTab, setActiveTab] = useState<'book' | 'services' | 'history'>('book');
  const [bookingForm, setBookingForm] = useState<BookingFormData>({
    from: '',
    to: '',
    date: '',
    time: '',
    passengers: 1,
    specialRequirements: '',
    contactPhone: '',
    contactName: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: keyof BookingFormData, value: string | number) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Request Sent",
      description: "Your special transport request has been sent to available drivers. You'll receive a confirmation call within 15 minutes.",
    });
    // Reset form
    setBookingForm({
      from: '',
      to: '',
      date: '',
      time: '',
      passengers: 1,
      specialRequirements: '',
      contactPhone: '',
      contactName: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'accepted': return 'bg-primary/10 text-primary border-primary/20';
      case 'in-progress': return 'bg-accent/10 text-accent border-accent/20';
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'cancelled': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Special Transport Services</h1>
        <p className="text-muted-foreground">
          Book dedicated rides for airport transfers, medical appointments, events, and more
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        <Button 
          variant={activeTab === 'book' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('book')}
        >
          Book Transport
        </Button>
        <Button 
          variant={activeTab === 'services' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('services')}
        >
          Available Services
        </Button>
        <Button 
          variant={activeTab === 'history' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('history')}
        >
          My Bookings
        </Button>
      </div>

      {/* Book Transport Tab */}
      {activeTab === 'book' && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Book Special Transport</h2>
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from">Pickup Location</Label>
                <Input
                  id="from"
                  placeholder="Enter pickup address"
                  value={bookingForm.from}
                  onChange={(e) => handleInputChange('from', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="to">Destination</Label>
                <Input
                  id="to"
                  placeholder="Enter destination"
                  value={bookingForm.to}
                  onChange={(e) => handleInputChange('to', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={bookingForm.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="passengers">Passengers</Label>
                <Input
                  id="passengers"
                  type="number"
                  min="1"
                  max="16"
                  value={bookingForm.passengers}
                  onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Your Name</Label>
                <Input
                  id="contactName"
                  placeholder="Full name"
                  value={bookingForm.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  placeholder="+27 XX XXX XXXX"
                  value={bookingForm.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="requirements">Special Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="Wheelchair access, luggage space, child seats, etc."
                value={bookingForm.specialRequirements}
                onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Booking Request
            </Button>
          </form>
        </Card>
      )}

      {/* Available Services Tab */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          {demoSpecialServices.map((service) => (
            <Card key={service.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{service.serviceName}</h3>
                  <p className="text-muted-foreground">by {service.driverName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-medium">{service.rating}</span>
                  <span className="text-sm text-muted-foreground">({service.completedBookings} trips)</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{service.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-primary" />
                  <span className="text-sm">{service.vehicleType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">Available: {service.availability}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Base price: R{service.basePrice}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">R{service.pricePerKm}/km</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Special Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {service.specialFeatures.map((feature, index) => (
                    <Badge key={index} variant="secondary">{feature}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">{service.contactPhone}</span>
                </div>
                <Button onClick={() => setActiveTab('book')}>
                  Book This Service
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Booking History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">My Booking History</h2>
          {demoBookings.map((booking) => (
            <Card key={booking.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{booking.from}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-medium">{booking.to}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{booking.passengerName}</p>
                </div>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {new Date(booking.requestedTime).toLocaleDateString()} at {new Date(booking.requestedTime).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">R{booking.price}</span> • {booking.distance} • {booking.estimatedDuration}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{booking.passengerPhone}</span>
                </div>
              </div>

              {booking.specialRequirements && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">Special Requirements:</h4>
                  <p className="text-sm text-muted-foreground">{booking.specialRequirements}</p>
                </div>
              )}

              {booking.status === 'completed' && (
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">Trip completed successfully</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};