import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Fuel, 
  Car, 
  Calculator,
  Download,
  Eye,
  Plus
} from "lucide-react";
import { demoFinancialData, demoDrivers } from "@/data/demoData";

interface EarningsReport {
  driverId: string;
  date: string;
  trips: number;
  grossEarnings: number;
  fuel: number;
  taxiRental: number;
  commission: number;
  otherExpenses: number;
  notes: string;
}

export const FinancialTracking = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'report' | 'history'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedDriver, setSelectedDriver] = useState('all');
  const [reportForm, setReportForm] = useState<EarningsReport>({
    driverId: '',
    date: new Date().toISOString().split('T')[0],
    trips: 0,
    grossEarnings: 0,
    fuel: 0,
    taxiRental: 0,
    commission: 0,
    otherExpenses: 0,
    notes: ''
  });
  const { toast } = useToast();

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const driver = demoDrivers.find(d => d.id === reportForm.driverId);
    toast({
      title: "Earnings Report Submitted",
      description: `Daily earnings report for ${driver?.name} has been recorded successfully.`,
    });
    // Reset form
    setReportForm({
      driverId: '',
      date: new Date().toISOString().split('T')[0],
      trips: 0,
      grossEarnings: 0,
      fuel: 0,
      taxiRental: 0,
      commission: 0,
      otherExpenses: 0,
      notes: ''
    });
  };

  const calculateTotals = () => {
    const totals = demoFinancialData.reduce((acc, entry) => {
      acc.grossEarnings += entry.grossEarnings;
      acc.fuel += entry.fuel;
      acc.taxiRental += entry.taxiRental;
      acc.commission += entry.commission;
      acc.netEarnings += entry.netEarnings;
      acc.trips += entry.trips;
      return acc;
    }, {
      grossEarnings: 0,
      fuel: 0,
      taxiRental: 0,
      commission: 0,
      netEarnings: 0,
      trips: 0
    });

    return totals;
  };

  const getDriverSummary = () => {
    const driverStats = demoDrivers.map(driver => {
      const driverData = demoFinancialData.filter(entry => entry.driverId === driver.id);
      const totals = driverData.reduce((acc, entry) => {
        acc.grossEarnings += entry.grossEarnings;
        acc.netEarnings += entry.netEarnings;
        acc.trips += entry.trips;
        return acc;
      }, { grossEarnings: 0, netEarnings: 0, trips: 0 });

      return {
        ...driver,
        ...totals,
        averagePerTrip: totals.trips > 0 ? totals.grossEarnings / totals.trips : 0
      };
    });

    return driverStats;
  };

  const totals = calculateTotals();
  const driverSummary = getDriverSummary();

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Financial Tracking</h1>
        <p className="text-muted-foreground">
          Track earnings, expenses, and financial performance across your fleet
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        <Button 
          variant={activeTab === 'overview' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('overview')}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Overview
        </Button>
        <Button 
          variant={activeTab === 'report' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('report')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Report Earnings
        </Button>
        <Button 
          variant={activeTab === 'history' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('history')}
        >
          <Calendar className="h-4 w-4 mr-2" />
          History
        </Button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Gross</p>
                  <p className="text-xl font-bold">R{totals.grossEarnings.toLocaleString()}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Net Earnings</p>
                  <p className="text-xl font-bold">R{totals.netEarnings.toLocaleString()}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Fuel className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fuel Costs</p>
                  <p className="text-xl font-bold">R{totals.fuel.toLocaleString()}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Car className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Trips</p>
                  <p className="text-xl font-bold">{totals.trips}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Driver Performance */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Driver Performance</h3>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>

            <div className="space-y-4">
              {driverSummary.map((driver) => (
                <div key={driver.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{driver.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {driver.trips} trips • Avg R{Math.round(driver.averagePerTrip)}/trip
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">R{driver.grossEarnings.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      Net: R{driver.netEarnings.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Report Earnings Tab */}
      {activeTab === 'report' && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Report Daily Earnings</h2>
          
          <form onSubmit={handleReportSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="driverSelect">Driver</Label>
                <Select onValueChange={(value) => setReportForm(prev => ({ ...prev, driverId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {demoDrivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={reportForm.date}
                  onChange={(e) => setReportForm(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="trips">Number of Trips</Label>
                <Input
                  id="trips"
                  type="number"
                  min="0"
                  value={reportForm.trips}
                  onChange={(e) => setReportForm(prev => ({ ...prev, trips: parseInt(e.target.value) || 0 }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="grossEarnings">Gross Earnings (R)</Label>
                <Input
                  id="grossEarnings"
                  type="number"
                  min="0"
                  step="0.01"
                  value={reportForm.grossEarnings}
                  onChange={(e) => setReportForm(prev => ({ ...prev, grossEarnings: parseFloat(e.target.value) || 0 }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="fuel">Fuel Costs (R)</Label>
                <Input
                  id="fuel"
                  type="number"
                  min="0"
                  step="0.01"
                  value={reportForm.fuel}
                  onChange={(e) => setReportForm(prev => ({ ...prev, fuel: parseFloat(e.target.value) || 0 }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="taxiRental">Taxi Rental (R)</Label>
                <Input
                  id="taxiRental"
                  type="number"
                  min="0"
                  step="0.01"
                  value={reportForm.taxiRental}
                  onChange={(e) => setReportForm(prev => ({ ...prev, taxiRental: parseFloat(e.target.value) || 0 }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="commission">Commission (R)</Label>
                <Input
                  id="commission"
                  type="number"
                  min="0"
                  step="0.01"
                  value={reportForm.commission}
                  onChange={(e) => setReportForm(prev => ({ ...prev, commission: parseFloat(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="otherExpenses">Other Expenses (R)</Label>
              <Input
                id="otherExpenses"
                type="number"
                min="0"
                step="0.01"
                value={reportForm.otherExpenses}
                onChange={(e) => setReportForm(prev => ({ ...prev, otherExpenses: parseFloat(e.target.value) || 0 }))}
                placeholder="Parking, tolls, maintenance, etc."
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={reportForm.notes}
                onChange={(e) => setReportForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional notes about the day"
              />
            </div>

            {/* Calculation Summary */}
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-4 w-4" />
                <span className="font-medium">Daily Summary</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Gross Earnings:</span>
                  <span className="font-medium ml-2">R{reportForm.grossEarnings.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Expenses:</span>
                  <span className="font-medium ml-2">
                    R{(reportForm.fuel + reportForm.taxiRental + reportForm.commission + reportForm.otherExpenses).toFixed(2)}
                  </span>
                </div>
                <div className="col-span-2 pt-2 border-t">
                  <span className="text-muted-foreground">Net Earnings:</span>
                  <span className="font-bold ml-2 text-lg">
                    R{(reportForm.grossEarnings - reportForm.fuel - reportForm.taxiRental - reportForm.commission - reportForm.otherExpenses).toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>

            <Button type="submit" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Submit Earnings Report
            </Button>
          </form>
        </Card>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Earnings History</h2>
            <div className="flex gap-2">
              <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Drivers</SelectItem>
                  {demoDrivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>

          {demoFinancialData
            .filter(entry => selectedDriver === 'all' || entry.driverId === selectedDriver)
            .map((entry) => (
            <Card key={entry.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">{entry.driverName}</h3>
                  <p className="text-muted-foreground">{entry.date} • {entry.route}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">R{entry.grossEarnings}</p>
                  <p className="text-sm text-muted-foreground">
                    Net: R{entry.netEarnings}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Trips:</span>
                  <span className="font-medium ml-1">{entry.trips}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Fuel:</span>
                  <span className="font-medium ml-1">R{entry.fuel}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Rental:</span>
                  <span className="font-medium ml-1">R{entry.taxiRental}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Hours:</span>
                  <span className="font-medium ml-1">{entry.workingHours}h</span>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Avg per trip: R{Math.round(entry.grossEarnings / entry.trips)}
                </span>
                <div className="flex items-center gap-2">
                  {entry.netEarnings > 0 ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                  <span className={entry.netEarnings > 0 ? "text-success" : "text-destructive"}>
                    R{entry.netEarnings}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};