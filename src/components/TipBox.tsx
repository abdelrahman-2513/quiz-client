import { Box, Paper, Typography } from "@mui/material";

export default function TipBox({ text, title }: { text: string; title: string }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Paper
        sx={{
          background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
          color: "#1976d2",
          height: "150px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          overflow: "hidden", 
        }}
      >
       
        <Box sx={{ width: "70%", padding: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
            Tip:
          </Typography>
          <Typography variant="body1">{text}</Typography>
        </Box>

       
        <Box
          sx={{
            width: "30%",
            height: "100%",
            position: "relative",
            display: "flex",

          }}
        >
          <img
            src="/headerImage.png"
            alt="Tip Image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "0 10px 10px 0",
              filter: "brightness(0.9) contrast(1.1)", 
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, rgba(187,222,251,0.8) 100%, rgba(227,242,253,0.5) 0%)",
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
