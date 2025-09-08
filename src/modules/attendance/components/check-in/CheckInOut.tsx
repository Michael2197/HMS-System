/**
 * Enhanced Check-in/Check-out Component
 * Modern UI with multiple verification methods and real-time features
 */

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  Chip,
  Avatar,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  Fade,
  Zoom,
  CircularProgress
} from '@mui/material';
import {
  PlayArrow as CheckInIcon,
  Stop as CheckOutIcon,
  LocationOn as LocationIcon,
  QrCode as QrCodeIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
  MyLocation as MyLocationIcon,
} from '@mui/icons-material';
import { CheckInMethod } from '../../types';
import type { GeoLocation } from '../../types';

interface CheckInOutProps {
  isCheckedIn: boolean;
  currentLocation?: GeoLocation | null;
  onCheckIn: (location?: GeoLocation, method?: CheckInMethod) => Promise<void>;
  onCheckOut: (location?: GeoLocation) => Promise<void>;
  loading?: boolean;
  geoFencingEnabled?: boolean;
  qrCodeEnabled?: boolean;
}

interface VerificationStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: 'pending' | 'active' | 'completed' | 'error';
  optional?: boolean;
}

export const CheckInOut: React.FC<CheckInOutProps> = ({
  isCheckedIn,
  currentLocation,
  onCheckIn,
  onCheckOut,
  loading = false,
  geoFencingEnabled = true,
  qrCodeEnabled = false
}) => {
  const theme = useTheme();
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [workingTime, setWorkingTime] = useState('08:30:45');
  const [activeStep, setActiveStep] = useState(0);
  const [processingStep, setProcessingStep] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<CheckInMethod>(CheckInMethod.MANUAL);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock working time update
  useEffect(() => {
    if (isCheckedIn) {
      const timer = setInterval(() => {
        const start = new Date();
        start.setHours(9, 0, 0, 0); // Assume checked in at 9 AM
        const now = new Date();
        const diff = now.getTime() - start.getTime();
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setWorkingTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCheckedIn]);

  const verificationSteps: VerificationStep[] = [
    {
      id: 'location',
      label: 'Location Verification',
      icon: <LocationIcon />,
      status: geoFencingEnabled ? 'pending' : 'completed',
      optional: !geoFencingEnabled
    },
    {
      id: 'confirmation',
      label: 'Confirmation',
      icon: <CheckCircleIcon />,
      status: 'pending'
    }
  ];

  const handleCheckInOut = async () => {
    if (geoFencingEnabled) {
      setShowVerificationDialog(true);
      setActiveStep(0);
    } else {
      try {
        if (isCheckedIn) {
          await onCheckOut(currentLocation || undefined);
        } else {
          await onCheckIn(currentLocation || undefined, selectedMethod);
        }
      } catch (error) {
        console.error('Check-in/out error:', error);
      }
    }
  };

  const processVerificationStep = async (stepId: string) => {
    setProcessingStep(stepId);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update step status
    const stepIndex = verificationSteps.findIndex(step => step.id === stepId);
    if (stepIndex !== -1) {
      verificationSteps[stepIndex].status = 'completed';
      setActiveStep(stepIndex + 1);
    }
    
    setProcessingStep(null);

    // If all steps completed, proceed with check-in/out
    if (stepId === 'confirmation') {
      try {
        if (isCheckedIn) {
          await onCheckOut(currentLocation || undefined);
        } else {
          await onCheckIn(currentLocation || undefined, selectedMethod);
        }
        setShowVerificationDialog(false);
        setActiveStep(0);
      } catch (error) {
        console.error('Check-in/out error:', error);
      }
    }
  };

  const getLocationStatus = () => {
    if (!currentLocation) {
      return { text: 'Location Unknown', color: 'error', icon: <ErrorIcon /> };
    }
    
    // Mock office location check
    const isInOffice = true; // This would be calculated based on geo-fencing
    
    if (isInOffice) {
      return { text: 'In Office', color: 'success', icon: <CheckCircleIcon /> };
    } else {
      return { text: 'Remote Location', color: 'warning', icon: <WarningIcon /> };
    }
  };

  const locationStatus = getLocationStatus();

  return (
    <>
      <Card
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          borderRadius: 3,
          overflow: 'visible',
          position: 'relative'
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
            <Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {isCheckedIn ? 'You\'re Checked In' : 'Ready to Check In'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Typography>
            </Box>
            
            <Chip
              icon={locationStatus.icon}
              label={locationStatus.text}
              color={locationStatus.color as any}
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          </Stack>

          {/* Current Time Display */}
          <Box
            sx={{
              textAlign: 'center',
              mb: 3,
              p: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              borderRadius: 2,
              backdropFilter: 'blur(10px)'
            }}
          >
            <Typography 
              variant="h2" 
              fontWeight={300}
              sx={{ 
                fontFamily: 'monospace',
                color: theme.palette.primary.main,
                mb: 1
              }}
            >
              {currentTime.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </Typography>
            
            {isCheckedIn && (
              <Fade in>
                <Box>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Working Time Today
                  </Typography>
                  <Typography 
                    variant="h5" 
                    fontWeight={600}
                    sx={{ color: theme.palette.success.main }}
                  >
                    {workingTime}
                  </Typography>
                </Box>
              </Fade>
            )}
          </Box>

          {/* Check-in/Out Button */}
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Zoom in timeout={500}>
              <Button
                variant="contained"
                size="large"
                onClick={handleCheckInOut}
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : isCheckedIn ? (
                    <CheckOutIcon />
                  ) : (
                    <CheckInIcon />
                  )
                }
                sx={{
                  minWidth: 200,
                  height: 56,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: isCheckedIn 
                    ? `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`
                    : `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[8]
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {loading ? 'Processing...' : isCheckedIn ? 'Check Out' : 'Check In'}
              </Button>
            </Zoom>
          </Box>

          {/* Method Selection */}
          {!isCheckedIn && (
            <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
              <Tooltip title="Manual Check-in">
                <IconButton
                  onClick={() => setSelectedMethod(CheckInMethod.MANUAL)}
                  sx={{
                    backgroundColor: selectedMethod === CheckInMethod.MANUAL ? theme.palette.primary.main : 'transparent',
                    color: selectedMethod === CheckInMethod.MANUAL ? 'white' : theme.palette.text.secondary,
                    '&:hover': {
                      backgroundColor: selectedMethod === CheckInMethod.MANUAL ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.1)
                    }
                  }}
                >
                  <ScheduleIcon />
                </IconButton>
              </Tooltip>
              
              {qrCodeEnabled && (
                <Tooltip title="QR Code Check-in">
                  <IconButton
                    onClick={() => setSelectedMethod(CheckInMethod.QR_CODE)}
                    sx={{
                      backgroundColor: selectedMethod === CheckInMethod.QR_CODE ? theme.palette.primary.main : 'transparent',
                      color: selectedMethod === CheckInMethod.QR_CODE ? 'white' : theme.palette.text.secondary
                    }}
                  >
                    <QrCodeIcon />
                  </IconButton>
                </Tooltip>
              )}
              
              <Tooltip title="Geofence Check-in">
                <IconButton
                  onClick={() => setSelectedMethod(CheckInMethod.GEOFENCE)}
                  sx={{
                    backgroundColor: selectedMethod === CheckInMethod.GEOFENCE ? theme.palette.primary.main : 'transparent',
                    color: selectedMethod === CheckInMethod.GEOFENCE ? 'white' : theme.palette.text.secondary
                  }}
                >
                  <MyLocationIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </CardContent>
      </Card>

      {/* Verification Dialog */}
      <Dialog
        open={showVerificationDialog}
        onClose={() => setShowVerificationDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600}>
              {isCheckedIn ? 'Check Out' : 'Check In'} Verification
            </Typography>
            <IconButton
              onClick={() => setShowVerificationDialog(false)}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        
        <DialogContent>
          <Stepper activeStep={activeStep} orientation="vertical">
            {verificationSteps.map((step) => (
              <Step key={step.id}>
                <StepLabel
                  icon={
                    processingStep === step.id ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Avatar
                        sx={{
                          backgroundColor: step.status === 'completed' 
                            ? theme.palette.success.main 
                            : step.status === 'active' 
                            ? theme.palette.primary.main 
                            : theme.palette.grey[300],
                          color: 'white',
                          width: 32,
                          height: 32
                        }}
                      >
                        {step.icon}
                      </Avatar>
                    )
                  }
                >
                  <Typography variant="body1" fontWeight={600}>
                    {step.label}
                    {step.optional && (
                      <Chip label="Optional" size="small" sx={{ ml: 1 }} />
                    )}
                  </Typography>
                </StepLabel>
                
                <StepContent>
                  <Box sx={{ p: 2 }}>
                    {step.id === 'location' && (
                      <Stack spacing={2}>
                        <Typography variant="body2" color="textSecondary">
                          Verifying your location...
                        </Typography>
                        <LinearProgress />
                        <Button
                          variant="contained"
                          onClick={() => processVerificationStep(step.id)}
                          disabled={processingStep === step.id}
                          startIcon={<MyLocationIcon />}
                        >
                          Verify Location
                        </Button>
                      </Stack>
                    )}
                    
                    {step.id === 'confirmation' && (
                      <Stack spacing={2}>
                        <Typography variant="body2" color="textSecondary">
                          Confirm your {isCheckedIn ? 'check out' : 'check in'}
                        </Typography>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => processVerificationStep(step.id)}
                          disabled={processingStep === step.id}
                          startIcon={<CheckCircleIcon />}
                        >
                          Confirm {isCheckedIn ? 'Check Out' : 'Check In'}
                        </Button>
                      </Stack>
                    )}
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setShowVerificationDialog(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CheckInOut;
