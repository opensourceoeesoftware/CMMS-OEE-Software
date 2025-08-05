import React from 'react';
import { Typography, Box,CardMedia } from '@mui/material';

const PrivacyPolicy = () => (
  <Box sx={{p:10}}>
    <CardMedia
                sx={{ height: 100, objectFit: 'contain', mb: 7 }}
                image="/g888.png"
                title="Logo"
                component="img"
            // sx={}
            />
    <Typography variant="h4">Privacy Policy</Typography>

    <Typography variant="body2">
      This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website (the "Site").
    </Typography>

    <br />

    <Typography variant="h5">Personal Information We Collect</Typography>
    <Typography variant="body2">
      When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information."
    </Typography>

    <br />

    <Typography variant="h5">We Collect Device Information Using the Following Technologies:</Typography>
    <Typography variant="body2">
      - "Cookies" are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.
    </Typography>

    <br />

    <Typography variant="h5">How Do We Use Your Personal Information?</Typography>
    <Typography variant="body2">
      We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
    </Typography>

    <br />

    <Typography variant="h5">Sharing Your Personal Information</Typography>
    <Typography variant="body2">
      We do not share your Personal Information with third parties. Additionally, we use Google Analytics to help us understand how our customers use the Site -- you can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.
    </Typography>

    <br />

    <Typography variant="h5">Changes</Typography>
    <Typography variant="body2">
      We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
    </Typography>

    <br />

    <Typography variant="h5">Contact Us</Typography>
    <Typography variant="body2">
      For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at email@email.io or by mail using the details provided below:
    </Typography>

    <Typography variant="body2">
      Name Street , City, Country
    </Typography>
  </Box>
);

export default PrivacyPolicy;