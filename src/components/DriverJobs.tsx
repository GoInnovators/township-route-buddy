import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, DollarSign, Users, Calendar, Phone, Mail, Briefcase, Star, CheckCircle2 } from "lucide-react";
import { demoDriverJobs } from "@/data/demoData";

interface ApplicationData {
  jobId: string;
  applicantName: string;
  phone: string;
  email: string;
  experience: string;
  licenseNumber: string;
  references: string;
  motivation: string;
}

export const DriverJobs = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'apply' | 'applications'>('browse');
  const [selectedJob, setSelectedJob] = useState<typeof demoDriverJobs[0] | null>(null);
  const [applicationForm, setApplicationForm] = useState<ApplicationData>({
    jobId: '',
    applicantName: '',
    phone: '',
    email: '',
    experience: '',
    licenseNumber: '',
    references: '',
    motivation: ''
  });
  const { toast } = useToast();

  const handleJobSelect = (job: typeof demoDriverJobs[0]) => {
    setSelectedJob(job);
    setApplicationForm(prev => ({ ...prev, jobId: job.id }));
    setActiveTab('apply');
  };

  const handleInputChange = (field: keyof ApplicationData, value: string) => {
    setApplicationForm(prev => ({ ...prev, [field]: value }));
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted",
      description: `Your application for ${selectedJob?.title} has been sent. The employer will contact you within 2-3 business days.`,
    });
    // Reset form
    setApplicationForm({
      jobId: '',
      applicantName: '',
      phone: '',
      email: '',
      experience: '',
      licenseNumber: '',
      references: '',
      motivation: ''
    });
    setActiveTab('browse');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-success/10 text-success border-success/20';
      case 'closed': return 'bg-muted/10 text-muted-foreground border-muted/20';
      case 'filled': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Taxi Driver Jobs</h1>
        <p className="text-muted-foreground">
          Find driving opportunities with established taxi operators across South Africa
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        <Button 
          variant={activeTab === 'browse' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('browse')}
        >
          Browse Jobs
        </Button>
        <Button 
          variant={activeTab === 'apply' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('apply')}
        >
          Apply
        </Button>
        <Button 
          variant={activeTab === 'applications' ? 'default' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('applications')}
        >
          My Applications
        </Button>
      </div>

      {/* Browse Jobs Tab */}
      {activeTab === 'browse' && (
        <div className="space-y-4">
          {demoDriverJobs.map((job) => (
            <Card key={job.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                  <p className="text-primary font-medium">{job.company}</p>
                </div>
                <Badge className={getStatusColor(job.status)}>
                  {job.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{job.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">Posted {job.postedDate}</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{job.description}</p>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Requirements:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="text-sm text-muted-foreground">{req}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Benefits:</h4>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary">{benefit}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{job.applicants} applicants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{job.contactPhone}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => handleJobSelect(job)}
                  disabled={job.status !== 'open'}
                >
                  {job.status === 'open' ? 'Apply Now' : 'Job Closed'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Apply Tab */}
      {activeTab === 'apply' && selectedJob && (
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Apply for: {selectedJob.title}</h2>
            <p className="text-muted-foreground">{selectedJob.company} • {selectedJob.location}</p>
          </div>

          <form onSubmit={handleApplicationSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="applicantName">Full Name</Label>
                <Input
                  id="applicantName"
                  placeholder="Your full name"
                  value={applicationForm.applicantName}
                  onChange={(e) => handleInputChange('applicantName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+27 XX XXX XXXX"
                  value={applicationForm.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={applicationForm.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="licenseNumber">PDP License Number</Label>
                <Input
                  id="licenseNumber"
                  placeholder="PDP License Number"
                  value={applicationForm.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="experience">Driving Experience</Label>
              <Textarea
                id="experience"
                placeholder="Describe your driving experience, routes you know, years of experience, etc."
                value={applicationForm.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="references">References</Label>
              <Textarea
                id="references"
                placeholder="Previous employers, contacts who can vouch for your driving skills"
                value={applicationForm.references}
                onChange={(e) => handleInputChange('references', e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="motivation">Why do you want this job?</Label>
              <Textarea
                id="motivation"
                placeholder="Tell the employer why you're the right person for this job"
                value={applicationForm.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Submit Application
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setActiveTab('browse')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* My Applications Tab */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">My Job Applications</h2>
          
          {/* Demo application statuses */}
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Full-time Taxi Driver - Joburg CBD Routes</h3>
                <p className="text-muted-foreground">Golden Taxi Services</p>
              </div>
              <Badge className="bg-warning/10 text-warning border-warning/20">
                Under Review
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Applied on Jan 12, 2024</span>
              <span>•</span>
              <span>Application ID: APP-001</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Weekend Taxi Driver - Soweto Routes</h3>
                <p className="text-muted-foreground">Ubuntu Transport Co-op</p>
              </div>
              <Badge className="bg-success/10 text-success border-success/20">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Interview Scheduled
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
              <span>Applied on Jan 10, 2024</span>
              <span>•</span>
              <span>Application ID: APP-002</span>
            </div>
            <div className="bg-success/5 border border-success/20 rounded-lg p-3">
              <p className="text-sm">
                <strong>Interview scheduled:</strong> January 20, 2024 at 10:00 AM<br/>
                <strong>Location:</strong> Ubuntu Transport Office, Soweto<br/>
                <strong>Contact:</strong> +27 82 456 7890
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};