import { Box, CircularProgress,  Typography } from '@mui/material'
import { useAnnouncements } from '../customHooks/useAnnouncemet';
import AnnouncementBox from './AnnouncementBox';

export default function Announcement() {
    const { announcements, isLoading: isLoadingAnnouncements } = useAnnouncements();
  return (
    <Box sx={{ backgroundColor: "white", width: {md:"60%",sx:"100%"}, padding: 2, borderRadius: 2, height: "100%" }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Announcements</Typography>
                    {isLoadingAnnouncements ? (
                        <CircularProgress />
                    ) : announcements?.length > 0 ? (
                        announcements.map((announcement: any) => (
                           <AnnouncementBox key={announcement.id} announcement={announcement} />
                        ))
                    ) : (
                        <Typography>No announcements found.</Typography>
                    )}
                </Box>
  )
}
