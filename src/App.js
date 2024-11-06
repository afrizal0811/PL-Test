import { create } from "jss";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";

import { StyledEngineProvider } from "@material-ui/styled-engine-sc";
import StylesProvider from "@material-ui/styles/StylesProvider";
import jssPreset from "@material-ui/styles/jssPreset";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import "./i18n";
import routes from "./routes";
import createTheme from "./theme";

import useTheme from "./hooks/useTheme";
import { store } from "./redux/store";

import { AuthProvider } from "./contexts/JWTContext";
import MaintenanceProvider, {
  useMaintenance,
} from "./contexts/MaintenanceProvider";
// import { AuthProvider } from "./contexts/FirebaseAuthContext";
// import { AuthProvider } from "./contexts/Auth0Context";

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point"),
});

const WrapperApp = () => {
  const content = useRoutes(routes);

  const { isMaintenance, isLoadingGetMaintenance } = useMaintenance();
  if (isMaintenance !== null && !isLoadingGetMaintenance) {
    return content;
  }
  return null;
};

function App() {
  const { theme } = useTheme();

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | Pangan Lestari"
        defaultTitle="Material App - React Admin & Dashboard Template"
      />
      <Provider store={store}>
        <StylesProvider jss={jss}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StyledEngineProvider injectFirst>
              <MuiThemeProvider theme={createTheme(theme)}>
                <ThemeProvider theme={createTheme(theme)}>
                  <AuthProvider>
                    <MaintenanceProvider>
                      <WrapperApp />
                    </MaintenanceProvider>
                  </AuthProvider>
                </ThemeProvider>
              </MuiThemeProvider>
            </StyledEngineProvider>
          </LocalizationProvider>
        </StylesProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
