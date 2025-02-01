import React, { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Button,
    CircularProgress,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAnnouncements } from "../customHooks/useAnnouncemet";
import { IAnnouncement } from "../interfaces/announcementInterface";
import AnnouncementBox from "../components/AnnouncementBox";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import AdminPageHeader from "../components/AdminPageHeader";


const AnnouncementPage: React.FC = () => {
    const { announcements, isLoading, createAnnouncement, updateAnnouncement, deleteAnnouncement } = useAnnouncements();
    const userData = useSelector((state: RootState) => state.auth.userData);
    const [openDialog, setOpenDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [editingAnnouncement, setEditingAnnouncement] = useState<IAnnouncement>({
        _id: undefined,
        title: "",
        content: "",
    });

    const handleOpenDialog = (announcement?: IAnnouncement) => {
        if (announcement) {
            setEditingAnnouncement({ _id: announcement._id, title: announcement.title, content: announcement.content });
        } else {
            setEditingAnnouncement({ _id: undefined, title: "", content: "" });
        }
        setErrorMessage(null); 
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setErrorMessage(null);
    };

    const handleSave = async () => {
        setErrorMessage(null);
        try {
            if (editingAnnouncement._id) {
                await updateAnnouncement.mutateAsync({ id: editingAnnouncement._id, data: { content: editingAnnouncement.content } });
            } else {
                await createAnnouncement.mutateAsync({ title: editingAnnouncement.title, content: editingAnnouncement.content });
            }
            handleCloseDialog();
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            
            <AdminPageHeader userText="Announcements" adminText="Manage Announcements" handleOpenDialog={handleOpenDialog} />
            {isLoading ? (
                <CircularProgress />
            ) : announcements?.length > 0 ? (
                announcements.map((announcement: IAnnouncement) => (
                    <Paper key={announcement._id} sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                        <AnnouncementBox key={announcement._id} announcement={announcement} />
                        {userData?.role !== "student" && <Box>
                            <IconButton color="primary" onClick={() => handleOpenDialog(announcement)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="secondary" onClick={() => deleteAnnouncement.mutateAsync(announcement._id as string)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>}
                    </Paper>
                ))
            ) : (
                <Typography>No announcements found.</Typography>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editingAnnouncement._id ? "Edit Announcement" : "Add Announcement"}</DialogTitle>
                <DialogContent>
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                    {!editingAnnouncement._id && (
                        <TextField
                            fullWidth
                            label="Title"
                            value={editingAnnouncement.title}
                            onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                            margin="dense"
                        />
                    )}
                    <TextField
                        fullWidth
                        label="Content"
                        value={editingAnnouncement.content}
                        onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })}
                        margin="dense"
                        multiline
                        rows={3}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AnnouncementPage;