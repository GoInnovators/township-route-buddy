import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Car, 
  User, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  Settings, 
  Plus,
  Edit,
  UserCheck
} from "lucide-react";
import { demoTaxis, demoDrivers } from "@/data/demoData";

export const TaxiManagement = () => {
  const [activeTab, setActiveTab] = useState<'fleet' | 'drivers' | 'assign'>('fleet');
  const [selectedTaxi, setSelectedTaxi] = useState<typeof demoTaxis[0] | null>(null);
  const [assignmentForm, setAssignmentForm] = useState({
    taxiId: '',
    driverId: '',
    startDate: '',
    route: ''
  });
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'maintenance': return 'bg-warning/10 text-warning border-warning/20';
      case 'inactive': return 'bg-muted/10 text-muted-foreground border-muted/20';
      case 'available': return 'bg-primary/10 text-primary border-primary/20';
      case 'suspended': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const handleAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const taxi = demoTaxis.find(t => t.id === assignmentForm.taxiId);
    const driver = demoDrivers.find(d => d.id === assignmentForm.driverId);
    
    toast({
      title: "Driver Assigned Successfully",
      description: `${driver?.name} has been assigned to ${taxi?.make} ${taxi?.model} (${taxi?.licensePlate})`,
    });
    
    // Reset form
    setAssignmentForm({ taxiId: '', driverId: '', startDate: '', route: '' });
  };

  const getUpcomingExpiries = () => {
    const now = new Date();
    const threeMonthsFromNow = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());
    
    const expiries = [];
    demoTaxis.forEach(taxi => {
      const insuranceDate = new Date(taxi.insuranceExpiry);
      const permitDate = new Date(taxi.permitExpiry);
      
      if (insuranceDate <= threeMonthsFromNow) {
        expiries.push({
          type: 'Insurance',
          vehicle: `${taxi.make} ${taxi.model} (${taxi.licensePlate})`,
          date: taxi.insuranceExpiry,
          urgent: insuranceDate <= new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
        });
      }
      
      if (permitDate <= threeMonthsFromNow) {
        expiries.push({
          type: 'Permit',
          vehicle: `${taxi.make} ${taxi.model} (${taxi.licensePlate})`,
          date: taxi.permitExpiry,
          urgent: permitDate <= new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
        });
      }
    });
    
    return expiries;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Taxi Fleet Management</h1>
        <p className="text-muted-foreground">
          Manage your taxi fleet, assign drivers, and track vehicle status
        </p>
      </div>

      {/* Important Alerts */}
      {getUpcomingExpiries().length > 0 && (
        <Card className="p-4 border-warning/50 bg-warning/5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h3 className="font-semibold text-warning">Upcoming Expiries</h3>
          </div>
          <div className="space-y-2">
            {getUpcomingExpiries().slice(0, 3).map((expiry, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{expiry.vehicle} - {expiry.type}</span>
                <Badge variant={expiry.urgent ? "destructive" : "outline"}>
                  {expiry.date}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        <Button 
          variant={activeTab === 'fleet' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('fleet')}
        >
          <Car className="h-4 w-4 mr-2" />
          Fleet Overview
        </Button>
        <Button 
          variant={activeTab === 'drivers' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('drivers')}
        >
          <User className="h-4 w-4 mr-2" />
          Drivers
        </Button>
        <Button 
          variant={activeTab === 'assign' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('assign')}
        >
          <UserCheck className="h-4 w-4 mr-2" />
          Assign Drivers
        </Button>
      </div>

      {/* Fleet Overview Tab */}
      {activeTab === 'fleet' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Fleet Overview</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </div>
          
          {demoTaxis.map((taxi) => (
            <Card key={taxi.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {taxi.make} {taxi.model} ({taxi.year})
                  </h3>
                  <p className="text-primary font-medium">{taxi.licensePlate}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(taxi.status)}>
                    {taxi.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Driver</span>
                  </div>
                  <p className="text-sm">
                    {taxi.driverName || <span className="text-muted-foreground">Unassigned</span>}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Settings className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Capacity</span>
                  </div>
                  <p className="text-sm">{taxi.capacity} passengers</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Weekly Earnings</span>
                  </div>
                  <p className="text-sm font-medium">R{taxi.weeklyEarnings.toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Route:</strong> {taxi.route} • <strong>Hours:</strong> {taxi.operatingHours}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Daily Target:</strong> R{taxi.dailyTarget}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Last Inspection:</span>
                  <p className="font-medium">{taxi.lastInspection}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Insurance Expiry:</span>
                  <p className="font-medium">{taxi.insuranceExpiry}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Permit Expiry:</span>
                  <p className="font-medium">{taxi.permitExpiry}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Drivers Tab */}
      {activeTab === 'drivers' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Driver Management</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Driver
            </Button>
          </div>
          
          {demoDrivers.map((driver) => (
            <Card key={driver.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{driver.name}</h3>
                  <p className="text-muted-foreground">{driver.email}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(driver.status)}>
                    {driver.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-sm text-muted-foreground">Experience</span>
                  <p className="font-medium">{driver.experience}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Total Trips</span>
                  <p className="font-medium">{driver.totalTrips.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{driver.rating}</span>
                    <span className="text-warning">★</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-muted-foreground">Weekly Earnings</span>
                  <p className="font-medium">R{driver.weeklyEarnings.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Monthly Earnings</span>
                  <p className="font-medium">R{driver.monthlyEarnings.toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-sm text-muted-foreground">Assigned Vehicle</span>
                <p className="font-medium">
                  {driver.taxiAssigned ? 
                    demoTaxis.find(t => t.id === driver.taxiAssigned)?.licensePlate :
                    <span className="text-muted-foreground">No vehicle assigned</span>
                  }
                </p>
              </div>

              <div>
                <span className="text-sm text-muted-foreground">Known Routes</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {driver.routes.map((route, index) => (
                    <Badge key={index} variant="secondary">{route}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Assign Drivers Tab */}
      {activeTab === 'assign' && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Assign Driver to Vehicle</h2>
          
          <form onSubmit={handleAssignment} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="taxiSelect">Select Vehicle</Label>
                <Select onValueChange={(value) => setAssignmentForm(prev => ({ ...prev, taxiId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {demoTaxis.filter(taxi => !taxi.driverId).map((taxi) => (
                      <SelectItem key={taxi.id} value={taxi.id}>
                        {taxi.make} {taxi.model} ({taxi.licensePlate})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="driverSelect">Select Driver</Label>
                <Select onValueChange={(value) => setAssignmentForm(prev => ({ ...prev, driverId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {demoDrivers.filter(driver => !driver.taxiAssigned).map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name} ({driver.experience})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Assignment Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={assignmentForm.startDate}
                  onChange={(e) => setAssignmentForm(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="route">Primary Route</Label>
                <Select onValueChange={(value) => setAssignmentForm(prev => ({ ...prev, route: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select route" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soweto-cbd">Soweto - Johannesburg CBD</SelectItem>
                    <SelectItem value="alexandra-sandton">Alexandra - Sandton</SelectItem>
                    <SelectItem value="soweto-sandton">Soweto - Sandton</SelectItem>
                    <SelectItem value="alexandra-rosebank">Alexandra - Rosebank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Assign Driver to Vehicle
            </Button>
          </form>

          {/* Current Assignments */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Current Assignments</h3>
            <div className="space-y-3">
              {demoTaxis.filter(taxi => taxi.driverId).map((taxi) => (
                <div key={taxi.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">{taxi.make} {taxi.model}</span>
                    <span className="text-muted-foreground ml-2">({taxi.licensePlate})</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{taxi.driverName}</p>
                    <p className="text-sm text-muted-foreground">{taxi.route}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};