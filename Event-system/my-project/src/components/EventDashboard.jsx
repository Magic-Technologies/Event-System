import React from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    IconButton,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider
} from '@mui/material';
import {
    Event as EventIcon,
    People as PeopleIcon,
    LocationOn as LocationIcon,
    CalendarToday as CalendarIcon,
    Notifications as NotificationsIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import EventCard from '../screens/EventScreen'; // Import the EventCard from EventScreen

const EventDashboard = () => {
    // Sample data for events
    const events = [
        {
            id: 1,
            title: 'Tech Conference 2024',
            date: 'March 15, 2024',
            location: 'San Francisco, CA'
        },
        {
            id: 2,
            title: 'React Summit 2024',
            date: 'April 20, 2024',
            location: 'New York, NY'
        },
        {
            id: 3,
            title: 'JavaScript Festival 2024',
            date: 'May 10, 2024',
            location: 'Austin, TX'
        }
    ];

    return (
        <Box sx={{ flexGrow: 1, height: '100vh', backgroundColor: '#f5f5f5' }}>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* Header Section */}
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#213547' }}>
                        Event Dashboard
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                        <IconButton>
                            <NotificationsIcon />
                        </IconButton>
                        <Avatar sx={{ bgcolor: '#646cff' }}>U</Avatar>
                    </Box>
                </Box>

                {/* Main Content Grid */}
                <Grid container spacing={3}>
                    {/* Upcoming Events Section */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Upcoming Events
                            </Typography>
                            <List>
                                {events.map((event) => (
                                    <ListItem key={event.id} alignItems="flex-start">
                                        <EventCard event={event} onEdit={() => { }} onDelete={() => { }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    {/* Stats Section */}
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Card sx={{ borderRadius: 2 }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Avatar sx={{ bgcolor: '#646cff', mr: 2 }}>
                                                <PeopleIcon />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="h6">Total Attendees</Typography>
                                                <Typography variant="h4">1,234</Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card sx={{ borderRadius: 2 }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Avatar sx={{ bgcolor: '#4c2c94', mr: 2 }}>
                                                <EventIcon />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="h6">Active Events</Typography>
                                                <Typography variant="h4">12</Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default EventDashboard;