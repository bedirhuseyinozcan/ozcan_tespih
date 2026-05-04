import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Info from "./Info";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { ChevronLeftRounded } from "@mui/icons-material";
import { ChevronRightRounded } from "@mui/icons-material";
import { FormProvider, set, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import requests from "../../api/apiClient";
import { clearCart } from "../cart/cartSlice";

const steps = ["Teslimat Bilgileri", "Ödeme Bilgileri", "Sipariş Özeti"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
  }
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const methods = useForm();

  async function handleNext(data) {
    if (activeStep === 2) {
      setLoading(true);
      try {
        const result = await requests.orders.createOrder(data);
        setOrderId(result.orderId);
        setActiveStep(activeStep + 1);
        dispatch(clearCart());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  }
  function handlePrevious() {
    setActiveStep(activeStep - 1);
  }

  return (
    <FormProvider {...methods}>
      <Paper>
        <Grid container spacing={3}>
          {activeStep !== steps.length && (
            <Grid
              size={4}
              sx={{ p: 3, borderRight: "1px solid", borderColor: "divider" }}
            >
              <Info></Info>
            </Grid>
          )}

          <Grid size={activeStep !== steps.length ? 8 : 12} sx={{ p: 3 }}>
            <Stepper activeStep={activeStep} sx={{ height: 40, mb: 4 }}>
              {steps.map((label) => (
                <Step key={label} sx={{ color: "secondary" }}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack>
                <Typography variant="h5">
                  Siparişinizi aldık, teşekkür ederiz!
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Sipariş numaranız <strong>{orderId}</strong>. Siparişinizin
                  durumunu takip etmek için hesabınızın siparişler bölümüne
                  gidebilirsiniz.
                </Typography>
                <Button
                  sx={{ alignSelf: "start", my: 2 }}
                  variant="contained"
                  color="secondary"
                >
                  Siparişleri Listele
                </Button>
              </Stack>
            ) : (
              <form onSubmit={methods.handleSubmit(handleNext)}>
                {getStepContent(activeStep)}

                <Box
                  sx={[
                    { display: "flex", mt: 3 },
                    activeStep !== 0
                      ? { justifyContent: "space-between" }
                      : { justifyContent: "flex-end" },
                  ]}
                >
                  {activeStep !== 0 && (
                    <Button
                      onClick={handlePrevious}
                      startIcon={<ChevronLeftRounded />}
                      variant="contained"
                      color="secondary"
                    >
                      Geri
                    </Button>
                  )}

                  <Button
                    type="submit"
                    startIcon={<ChevronRightRounded />}
                    variant="contained"
                    color="secondary"
                  >
                    {loading ? (
                      <CircularProgress />
                    ) : activeStep === 2 ? (
                      "Siparişi Tamamla"
                    ) : (
                      "İleri"
                    )}
                  </Button>
                </Box>
              </form>
            )}
          </Grid>
        </Grid>
      </Paper>
    </FormProvider>
  );
}
