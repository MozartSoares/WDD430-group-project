// src/app/(frontend)/login/page.tsx
"use client";

import { Footer, Header } from "@/components/layout";
import {
  ArrowBack,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

export const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/"); // Redirect to homepage
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header cartItemCount={0} onCartClick={() => {}} />

      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#1976d2",
          py: 6,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container component="main" maxWidth="sm">
          {/* Back Button */}
          <Box sx={{ mb: 3 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => router.push("/")}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Back to Handcrafted Haven
            </Button>
          </Box>

          <Paper
            elevation={24}
            sx={{
              p: 6,
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                component="h1"
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "#1976d2",
                  mb: 1,
                }}
              >
                Welcome Back
              </Typography>

              <Typography variant="body1" color="text.secondary">
                Sign in to your Handcrafted Haven account
              </Typography>
            </Box>

            {/* Demo Credentials Alert */}
            <Alert
              severity="info"
              sx={{
                mb: 3,
                borderRadius: 2,
                "& .MuiAlert-message": {
                  fontSize: "0.875rem",
                },
              }}
            >
              <p>
                <strong>Demo Login:</strong> demo@example.com / password
              </p>
              <p>
                <strong>Artist1 Login:</strong> artisan1@example.com / password
              </p>
              <p>
                <strong>Artist2 Login:</strong> artisan2@example.com" / password
              </p>
            </Alert>

            {/* Error Alert */}
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                }}
              >
                {error}
              </Alert>
            )}

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 2,
                  mb: 3,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: 2,
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                    transform: "translateY(-1px)",
                  },
                  "&:disabled": {
                    backgroundColor: "rgba(0, 0, 0, 0.12)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  or
                </Typography>
              </Divider>

              {/* Action Links */}
              <Stack spacing={2} alignItems="center">
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => router.push("/register")}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    borderColor: "#1976d2",
                    color: "#1976d2",
                    "&:hover": {
                      borderColor: "#1565c0",
                      backgroundColor: "rgba(25, 118, 210, 0.04)",
                    },
                  }}
                >
                  Create New Account
                </Button>

                <Link
                  component="button"
                  variant="body2"
                  onClick={() => router.push("/forgot-password")}
                  sx={{
                    color: "#1976d2",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot your password?
                </Link>
              </Stack>
            </Box>
          </Paper>

          {/* Bottom Text */}
          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 4,
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "0.875rem",
            }}
          >
            Discover unique handcrafted treasures from talented artisans around
            the world
          </Typography>
        </Container>
      </Box>

      <Footer onContactClick={() => {}} onLinkClick={() => {}} />
    </Box>
  );
};

export default LoginPage;
